// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 14/04/2017 : Move filter application in main process
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : contains and icontains filters accept regex
// VERSION : 1.1.2 : FA : ISIS-FT-1952 : 16/05/2017 : Apply filters considering data type
// VERSION : 1.1.2 : FA : ISIS-FT-1952 : 18/05/2017 : Add robustness in filters to avoid crash when
//  operand is invalid
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 2.0.0 : FA : #8416 : 10/10/2017 : Fix stateColor applying for all types
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _isEmpty from 'lodash/isEmpty';
import Long from 'long';
import Decimal from 'decimal.js';
import moment from 'moment';
import getLogger from 'common/logManager';
import globalConstants from 'constants';
import { operators } from 'common/operators';

const logger = getLogger('viewManager:commonData:applyFilters');

function booleanFilter(value, operator, expected) {
  // Expected is stored as a string
  // Value is a boolean
  switch (operators[operator]) {
    case globalConstants.FILTERTYPE_EQ:
      return String(value) === expected;
    case globalConstants.FILTERTYPE_NE:
      return String(value) !== expected;
    default:
      return true;
  }
}

function enumFilter(value, operator, expected) {
  // Expected is stored as a string
  // Value is a string (in symbol)
  switch (operators[operator]) {
    case globalConstants.FILTERTYPE_EQ:
      return value === expected;
    case globalConstants.FILTERTYPE_NE:
      return value !== expected;
    case globalConstants.FILTERTYPE_CONTAINS:
      return contains(value, expected);
    case globalConstants.FILTERTYPE_ICONTAINS:
      return icontains(value, expected);
    default:
      return true;
  }
}

function longFilter(value, operator, expected) {
  // Check validity of expected to avoid exception
  if (Number.isNaN(Number(expected))) {
    return true;
  }
  // value and expected are stringToBytes
  const longValue = Long.fromString(value);
  const longExpected = Long.fromString(expected);
  switch (operators[operator]) {
    case globalConstants.FILTERTYPE_EQ:
      return longValue.eq(longExpected);
    case globalConstants.FILTERTYPE_NE:
      return longValue.neq(longExpected);
    case globalConstants.FILTERTYPE_LT:
      return longValue.lt(Long.fromString(expected));
    case globalConstants.FILTERTYPE_LE:
      return longValue.lte(Long.fromString(expected));
    case globalConstants.FILTERTYPE_GT:
      return longValue.gt(Long.fromString(expected));
    case globalConstants.FILTERTYPE_GE:
      return longValue.gte(Long.fromString(expected));
    default:
      return true;
  }
}

function doubleFilter(value, operator, expected) {
  // Check validity of expected to avoid exception
  if (Number.isNaN(Number(expected))) {
    return true;
  }
  // value and expected are stringToBytes
  const doubleValue = new Decimal(value);
  switch (operators[operator]) {
    case globalConstants.FILTERTYPE_EQ:
      return doubleValue.equals(expected);
    case globalConstants.FILTERTYPE_NE:
      return !doubleValue.equals(expected);
    case globalConstants.FILTERTYPE_LT:
      return doubleValue.lessThan(expected);
    case globalConstants.FILTERTYPE_LE:
      return doubleValue.lessThanOrEqualTo(expected);
    case globalConstants.FILTERTYPE_GT:
      return doubleValue.greaterThan(expected);
    case globalConstants.FILTERTYPE_GE:
      return doubleValue.greaterThanOrEqualTo(expected);
    default:
      return true;
  }
}

function stringFilter(value, operator, expected) {
  switch (operators[operator]) {
    case globalConstants.FILTERTYPE_EQ:
      return value === expected;
    case globalConstants.FILTERTYPE_NE:
      return value !== expected;
    case globalConstants.FILTERTYPE_CONTAINS:
      return contains(value, expected);
    case globalConstants.FILTERTYPE_ICONTAINS:
      return icontains(value, expected);
    default:
      return true;
  }
}

function timeFilter(value, operator, expected) {
  switch (operators[operator]) {
    case globalConstants.FILTERTYPE_EQ:
      return value.isSame(expected);
    case globalConstants.FILTERTYPE_NE:
      return !value.isSame(expected);
    case globalConstants.FILTERTYPE_LT:
      return value.isBefore(expected);
    case globalConstants.FILTERTYPE_LE:
      return value.isBefore(expected) || value.isSame(expected);
    case globalConstants.FILTERTYPE_GT:
      return value.isAfter(expected);
    case globalConstants.FILTERTYPE_GE:
      return value.isAfter(expected) || value.isSame(expected);
    default:
      return false;
  }
}

/* eslint-disable complexity, "DV6 TBC_CNES Filter need check differents cases" */
function applyFilter(data, filter) {
  if (!filter.operator
    || typeof filter.field !== 'string'
    || filter.field === ''
    || typeof filter.operand === 'undefined'
    || typeof data[filter.field] === 'undefined') {
    return true;
  }
  logger.debug(
    `applying filter ${JSON.stringify(filter)} to data ${JSON.stringify(data[filter.field])}`
  );
  // get value considering data type
  const type = data[filter.field].type;
  if (type === 'long' || type === 'ulong') {
    return longFilter(data[filter.field].symbol, filter.operator, filter.operand);
  } else if (type === 'enum') {
    return enumFilter(data[filter.field].symbol, filter.operator, filter.operand);
  } else if (type === 'blob') {
    // nothing to compare
    return true;
  } else if (type === 'double') {
    return doubleFilter(data[filter.field].symbol, filter.operator, filter.operand);
  } else if (type === 'boolean') {
    return booleanFilter(data[filter.field].value, filter.operator, filter.operand);
  } else if (type === 'string') {
    return stringFilter(data[filter.field].value, filter.operator, filter.operand);
  } else if (type === 'time') {
    const dataTime = moment(data[filter.field].value);
    const operandTime = moment(filter.operand, globalConstants.DATETIME_TILL_MS_FORMAT);
    return timeFilter(dataTime, filter.operator, operandTime);
  }
  // Other case of number
  const value = data[filter.field].value;

  // no data to check
  if (!value) {
    return true;
  }

  const expected = Number(filter.operand);
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
    case globalConstants.FILTERTYPE_ICONTAINS:
    default:
      return true;
  }
}

function contains(value, expected) {
  // can be used with regex
  if (expected.startsWith('/')) {
    const splitExp = expected.split('/');
    let option;
    if (splitExp.length === 3 && !_isEmpty(splitExp[2])) {
      option = splitExp[2];
    }
    const expectedValue = new RegExp(splitExp[1], option);
    return expectedValue.test(value);
  }
  return value.search(expected) !== -1;
}
function icontains(value, expected) {
  // can be used with regex
  if (expected.startsWith('/')) {
    const splitExp = expected.split('/');
    let option;
    if (splitExp.length === 3 && !_isEmpty(splitExp[2])) {
      option = splitExp[2];
    }
    const expectedValue = new RegExp(splitExp[1], option);
    return !expectedValue.test(value);
  }
  return value.search(expected) === -1;
}

module.exports = {
  applyFilters: (data, filters = []) => !filters.find(f => !applyFilter(data, f)),
  applyFilter,
};
