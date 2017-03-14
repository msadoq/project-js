import _map from 'lodash/map';
import _isArray from 'lodash/isArray';
import _isObject from 'lodash/isObject';
import _isString from 'lodash/isString';

const ARRAY = 'array';
const OBJECT = 'object';
const ITEM = 'item';
const KEY = 'key';
const LINK = 'link';

const getType = (parentType, key, value) => {
  if (_isArray(value)) {
    return ARRAY;
  }
  if (_isObject(value)) {
    return OBJECT;
  }
  if (key === 'Link' && _isString(value)) {
    return LINK;
  }
  if (parentType === ARRAY) {
    return ITEM;
  }
  if (parentType === OBJECT) {
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


/* const data = {
  path: [],
  name: 'PARAMETER NAME',
  toggled: true,
  children: [{
    path: ['children', '0'],
    name: 'Object',
    type: OBJECT,
    toggled: true,
    children: [{
      path: ['children', '0', 'children', '0'],
      name: 'Key1',
    }, {
      path: ['children', '0', 'children', '1'],
      name: 'Key2',
    }],
  }, {
    path: ['children', '1'],
    type: ARRAY,
    name: 'Loading Array',
    loading: true,
    children: [],
  }, {
    path: ['children', '2'],
    type: ARRAY,
    name: 'Array',
    children: [{
      path: ['children', '2', 'children', '0', 'children', '0'],
      name: 'Item 1',
    }, {
      path: ['children', '2', 'children', '0', 'children', '1'],
      name: 'Item 2',
    }],
  }],
};*/
