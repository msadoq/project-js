// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add a tree component and format inspector data to be consumed
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add styles for the inspector
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific TM data
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static data
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : FA : #7355 : 27/07/2017 : RTD is now optional on VIMA installation
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

import Long from 'long';
import _map from 'lodash/map';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import _isString from 'lodash/isString';
import {
  NODE_TYPE_ARRAY as ARRAY,
  NODE_TYPE_ARRAY_ITEM as ARRAY_ITEM,
  NODE_TYPE_OBJECT as OBJECT,
  NODE_TYPE_OBJECT_ITEM as OBJECT_ITEM,
  NODE_TYPE_ITEM as ITEM,
  NODE_TYPE_KEY as KEY,
  NODE_TYPE_LINK as LINK,
  NODE_TYPE_RESOLVED_LINK as RESOLVED_LINK,
} from '../constants';

const dynamicRequire = process.env.IS_BUNDLED === 'on' ? global.dynamicRequire : require; // eslint-disable-line

const getType = (parentType, key, value) => {
  const RTD_LINK = dynamicRequire('rtd/constants').LINK;
  if (_isArray(value)) {
    if (parentType === ARRAY) {
      return ARRAY_ITEM;
    }
    return ARRAY;
  }
  if (_isObject(value) && !Long.isLong(value)) {
    if (parentType === ARRAY) {
      return OBJECT_ITEM;
    }
    return OBJECT;
  }
  if (key === RTD_LINK && _isString(value)) {
    return LINK;
  }
  if (parentType === ARRAY || parentType === ARRAY_ITEM) {
    return ITEM;
  }
  if (parentType === OBJECT || parentType === OBJECT_ITEM || parentType === RESOLVED_LINK) {
    return KEY;
  }
  return undefined;
};

const processValue = (value) => {
  if (Long.isLong(value)) {
    return value.toString();
  }
  return value;
};

const recursiveFormatChildren = (parentPath, parentType, parentName, data) => {
  let childIdx = 0;
  return _map(data, (value, key) => {
    const path = [...parentPath, `${childIdx}`];
    const type = getType(parentType, key, value);
    childIdx += 1;
    switch (type) {
      case ARRAY_ITEM:
      case OBJECT_ITEM:
      case ARRAY:
      case OBJECT:
      case RESOLVED_LINK: {
        const children = recursiveFormatChildren([...path, 'children'], type, key, value);
        return {
          path,
          name: key,
          parentName,
          type,
          children,
        };
      }
      case KEY:
      case LINK:
        return {
          path,
          name: key,
          parentName,
          type,
          value: processValue(value),
        };
      case ITEM:
        return {
          path,
          name: key,
          parentName,
          type,
          value: processValue(value),
        };
      default:
        return null;
    }
  });
};

export default function (data, { rootName = 'root', path = [], type = OBJECT } = {}) {
  return {
    path,
    name: rootName,
    type,
    children: recursiveFormatChildren([...path, 'children'], type, rootName, data),
  };
}
