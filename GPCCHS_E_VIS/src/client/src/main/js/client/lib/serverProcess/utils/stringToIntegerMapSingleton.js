import { get as configurationManagerGet } from 'common/configurationManager/index';
import _forEach from 'lodash/forEach';
import _ from 'lodash/fp';

let stringToIntegerMap = {};
let maxValues = {};
let fn = () => {};

const getAll = () => stringToIntegerMap;

const getValue = (field, string) => _.getOr(0, [field, string], stringToIntegerMap);

const getByField = field => _.getOr(false, [field], stringToIntegerMap);

// ============= max value functions =============

const initMaxValues = () => {
  const initialObject = {};
  const fields = Object.keys(getAll());
  _forEach(fields, (field) => {
    let maxValue = -1;
    _forEach(getByField(field), (value, key) => {
      maxValue = maxValue < getValue(field, key) ? getValue(field, key) : maxValue;
    });
    initialObject[field] = maxValue;
  });
  return initialObject;
};

const getMaxValues = () => maxValues;

const getMaxValue = field => _.getOr(-1, [field], maxValues);

// ============= string to integer map functions =============
// reverse function
const getStringByValue = (field, value) =>
  Object.keys(getByField(field)).find(key => getByField(field)[key] === value);

const getOrCreate = (field, string) => {
  let value = getValue(field, string);
  if (!value) {
    if (getByField(field)) {
      value = getMaxValue(field) + 1;
      stringToIntegerMap = _.set(
        [field, string],
        value,
        stringToIntegerMap
      );
    } else {
      stringToIntegerMap = _.set(
        [field, string],
        value,
        stringToIntegerMap
      );
    }
    maxValues = _.set([field], value, maxValues);
  }
  fn(stringToIntegerMap);
  return value;
};

const init = (sendSingleton) => {
  stringToIntegerMap = configurationManagerGet('STRING_TO_VALUE_MAP');
  maxValues = initMaxValues();
  fn = sendSingleton;
  fn(stringToIntegerMap);
};


export default{
  init,
  getOrCreate,
  getAll,
  getByField,
  getValue,
  getMaxValue,
  getMaxValues,
  getStringByValue,
};
