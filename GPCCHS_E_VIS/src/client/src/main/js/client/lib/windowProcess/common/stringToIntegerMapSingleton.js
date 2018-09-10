import _ from 'lodash/fp';

let stringToIntegerMap = {};

// ============= string to integer map functions =============
const set = (singleton) => {
  stringToIntegerMap = singleton;
};

const getAll = () => stringToIntegerMap;

const getValue = (field, string) => _.getOr(false, [field, string], stringToIntegerMap);

const getByField = field => _.getOr(false, [field], stringToIntegerMap);

// reverse function
const getStringByValue =
  (field, value) =>
    Object.keys(getByField(field)).find(key => getByField(field)[key] === value);

export default{
  set,
  getAll,
  getByField,
  getValue,
  getStringByValue,
};
