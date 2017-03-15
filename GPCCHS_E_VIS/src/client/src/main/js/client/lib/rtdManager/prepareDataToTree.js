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
} from 'common/constants';
import { LINK as RTD_LINK } from 'rtd/constants';


const getType = (parentType, key, value) => {
  if (_isArray(value)) {
    if (parentType === ARRAY) {
      return ARRAY_ITEM;
    }
    return ARRAY;
  }
  if (_isObject(value)) {
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
  if (parentType === OBJECT || parentType === OBJECT_ITEM) {
    return KEY;
  }
  return undefined;
};

const recursiveFormatChildren = (parentPath, parentType, data) => {
  let childIdx = 0;
  return _map(data, (value, key) => {
    const path = [...parentPath, 'children', `${childIdx}`];
    const type = getType(parentType, key, value);
    childIdx += 1;
    switch (type) {
      case ARRAY_ITEM:
      case OBJECT_ITEM:
      case ARRAY:
      case OBJECT: {
        const children = recursiveFormatChildren(path, type, value);
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
          value: data[key],
        };
      case ITEM:
        return {
          path,
          name: key,
          type,
          value,
        };
      default:
        return null;
    }
  });
};

export default (data, rootName) => ({
  path: [],
  name: rootName,
  type: OBJECT,
  children: recursiveFormatChildren([], OBJECT, data),
});
