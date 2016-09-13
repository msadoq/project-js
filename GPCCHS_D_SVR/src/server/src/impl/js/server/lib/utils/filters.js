const debug = require('../io/debug')('utils:filters');
const constants = require('../constants');

function applyFilter(data, filter) {
  if (
    typeof filter.operator !== 'string'
    || filter.operator === ''
    || typeof filter.field !== 'string'
    || filter.field === ''
    || typeof filter.value === 'undefined'
    || typeof data[filter.field] === 'undefined') {
    return true;
  }

  debug.verbose(`applying filter ${filter} to data ${data[filter.field]}`);

  const expected = filter.value;
  const value = data[filter.field];
  switch (filter.operator) {
    case constants.FILTEROPERATOR_EQ:
      return value === expected;
    case constants.FILTEROPERATOR_NE:
      return value !== expected;
    case constants.FILTEROPERATOR_LT:
      return value < expected;
    case constants.FILTEROPERATOR_LE:
      return value <= expected;
    case constants.FILTEROPERATOR_GT:
      return value > expected;
    case constants.FILTEROPERATOR_GE:
      return value >= expected;
    case constants.FILTEROPERATOR_CONTAINS:
      return value.includes(expected);
    case constants.FILTEROPERATOR_ICONTAINS:
      return !value.includes(expected);
    default:
      return true;
  }
}

module.exports = (data, filters = []) => !filters.find(f => !applyFilter(data, f));
