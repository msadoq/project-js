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
} from 'common/constants';
import { LINK as RTD_LINK } from 'rtd/constants';


const getType = (parentType, key, value) => {
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

const recursiveFormatChildren = (parentPath, parentType, data) => {
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
        const children = recursiveFormatChildren([...path, 'children'], type, value);
        return {
          path,
          name: key,
          type,
          children,
        };
      }
      case KEY:
      case LINK:
        return {
          path,
          name: key,
          type,
          value: processValue(value),
        };
      case ITEM:
        return {
          path,
          name: key,
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
    children: recursiveFormatChildren([...path, 'children'], type, data),
  };
}
