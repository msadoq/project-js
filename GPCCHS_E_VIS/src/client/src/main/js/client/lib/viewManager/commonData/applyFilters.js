import _isEmpty from 'lodash/isEmpty';
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
  // get value considering data type
  const type = data[filter.field].type;
  let value;
  if (type === 'long' || type === 'ulong') {
    value = data[filter.field].value;
  } else if (type === 'enum') {
    value = data[filter.field].symbol;
  } else if (type === 'blob') {
    // nothing to compare
    return true;
  } else {
    value = data[filter.field].value;
  }
  // no data to check
  if (!value) {
    return true;
  }

  let expected = filter.operand;
  switch (operators[filter.operator]) {
    case globalConstants.FILTERTYPE_EQ:
      if (type === 'long' || type === 'ulong') {
        return data[filter.field].symbol === expected;
      }
      return value === expected;
    case globalConstants.FILTERTYPE_NE:
      if (type === 'long' || type === 'ulong') {
        return data[filter.field].symbol !== expected;
      }
      return value !== expected;
    case globalConstants.FILTERTYPE_LT:
      if (type === 'boolean' || type === 'enum') {
        return true;
      }
      return value < expected;
    case globalConstants.FILTERTYPE_LE:
      if (type === 'boolean' || type === 'enum') {
        return true;
      }
      return value <= expected;
    case globalConstants.FILTERTYPE_GT:
      if (type === 'boolean' || type === 'enum') {
        return true;
      }
      return value > expected;
    case globalConstants.FILTERTYPE_GE:
      if (type === 'boolean' || type === 'enum') {
        return true;
      }
      return value >= expected;
    case globalConstants.FILTERTYPE_CONTAINS: {
      if (type === 'boolean') {
        return true;
      }
      // can be used with regex
      if (expected.startsWith('/')) {
        const splitExp = expected.split('/');
        let option;
        if (splitExp.length === 3 && !_isEmpty(splitExp[2])) {
          option = splitExp[2];
        }
        expected = new RegExp(splitExp[1], option);
        return expected.test(value);
      }
      return value.search(expected) !== -1;
    }
    case globalConstants.FILTERTYPE_ICONTAINS: {
      if (type === 'boolean') {
        return true;
      }
      // can be used with regex
      if (expected.startsWith('/')) {
        const splitExp = expected.split('/');
        let option;
        if (splitExp.length === 3 && !_isEmpty(splitExp[2])) {
          option = splitExp[2];
        }
        expected = new RegExp(splitExp[1], option);
        return !expected.test(value);
      }
      return value.search(expected) === -1;
    }
    default:
      return true;
  }
}

module.exports = {
  applyFilters: (data, filters = []) => !filters.find(f => !applyFilter(data, f)),
};
