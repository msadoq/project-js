const debug = require('../io/debug')('utils:filters');
const { constants: globalConstants } = require('common');

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
    case globalConstants.FILTERTYPE_EQ:
      return value === expected;
    case globalConstants.FILTERTYPE_NE:
      return value !== expected;
    case globalConstants.FILTERTYPE_LT:
      return value < expected;
    case globalConstants.FILTERTYPE_LE:
      return value <= expected;
    case globalConstants.FILTERTYPE_GT:
      return value > expected;
    case globalConstants.FILTERTYPE_GE:
      return value >= expected;
    case globalConstants.FILTERTYPE_CONTAINS:
      return value.includes(expected);
    case globalConstants.FILTERTYPE_ICONTAINS:
      return !value.includes(expected);
    default:
      return true;
  }
}

module.exports = {
  applyFilters: (data, filters = []) => !filters.find(f => !applyFilter(data, f)),
};
