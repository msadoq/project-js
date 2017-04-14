import _get from 'lodash/get';
import getLogger from 'common/log';
import globalConstants from 'common/constants';
import { operators } from '../../common/operators';

const logger = getLogger('viewManager:commonData:applyFilters');

function applyFilter(data, filter) {
  if (!filter.operator
    || typeof filter.field !== 'string'
    || filter.field === ''
    || typeof filter.operand === 'undefined'
    || typeof data[filter.field] === 'undefined') {
    return true;
  }
  logger.debug(`applying filter ${filter} to data ${data[filter.field]}`);
  const expected = filter.operand;
  const value = _get(data, [filter.field, 'value']);
  switch (operators[filter.operator]) {
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
