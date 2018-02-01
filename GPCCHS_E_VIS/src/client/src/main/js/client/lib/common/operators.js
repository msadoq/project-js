// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : StateColors serialized in localid and present in viewData
// VERSION : 1.1.2 : DM : #5828 : 12/05/2017 : contains and icontains filters accept regex
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// END-HISTORY
// ====================================================================

import globalConstants from '../constants';

export const operators = {
  '=': globalConstants.FILTERTYPE_EQ,
  '!=': globalConstants.FILTERTYPE_NE,
  '<': globalConstants.FILTERTYPE_LT,
  '<=': globalConstants.FILTERTYPE_LE,
  '>': globalConstants.FILTERTYPE_GT,
  '>=': globalConstants.FILTERTYPE_GE,
  CONTAINS: globalConstants.FILTERTYPE_CONTAINS,
  ICONTAINS: globalConstants.FILTERTYPE_ICONTAINS,
};

const operatorFns = {
  '=': (f, o) => f === o,
  '!=': (f, o) => f !== o,
  '<': (f, o) => f < o,
  '<=': (f, o) => f <= o,
  '>': (f, o) => f > o,
  '>=': (f, o) => f >= o,
  CONTAINS: (f, o) => (new RegExp(o, 'i')).test(f),
  ICONTAINS: (f, o) => !(new RegExp(o, 'i')).test(f),
};

const tryParseNumber = n => (isNaN(Number(n)) ? n : Number(n));

const noOp = () => false;

export const compile = ({
  operator,
  operand,
}) => f => (operatorFns[operator] || noOp)(f, tryParseNumber(operand));
