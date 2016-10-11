const debug = require('../io/debug')('utils:filters');
const constants = require('../constants');
const _ = require('lodash');

function applyFilter(data, filter) {
  if (
    typeof filter.type !== 'number'
    || typeof filter.fieldName !== 'string'
    || filter.fieldName === ''
    || typeof filter.fieldValue === 'undefined'
    || typeof data[filter.fieldName] === 'undefined') {
    return true;
  }

  debug.debug(`applying filter ${filter} to data ${data[filter.field]}`);

  const expected = filter.fieldValue;
  const value = data[filter.fieldName];
  switch (filter.type) {
    case constants.FILTERTYPE_EQ:
      return value === expected;
    case constants.FILTERTYPE_NE:
      return value !== expected;
    case constants.FILTERTYPE_LT:
      return value < expected;
    case constants.FILTERTYPE_LE:
      return value <= expected;
    case constants.FILTERTYPE_GT:
      return value > expected;
    case constants.FILTERTYPE_GE:
      return value >= expected;
    case constants.FILTERTYPE_CONTAINS:
      return value.includes(expected);
    case constants.FILTERTYPE_ICONTAINS:
      return !value.includes(expected);
    default:
      return true;
  }
}

module.exports = {
  applyFilters: (data, filters = []) => !filters.find(f => !applyFilter(data, f)),
};
