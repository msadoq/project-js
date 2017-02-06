import globalConstants from 'common/constants';

export const operators = {
  '=': globalConstants.FILTERTYPE_EQ,
  '!=': globalConstants.FILTERTYPE_NE,
  '<': globalConstants.FILTERTYPE_LT,
  '<=': globalConstants.FILTERTYPE_LE,
  '>': globalConstants.FILTERTYPE_GT,
  '>=': globalConstants.FILTERTYPE_GE,
  contains: globalConstants.FILTERTYPE_CONTAINS,
  icontains: globalConstants.FILTERTYPE_ICONTAINS,
};

const operatorFns = {
  '=': (f, o) => f === o,
  '!=': (f, o) => f !== o,
  '<': (f, o) => f < o,
  '<=': (f, o) => f <= o,
  '>': (f, o) => f > o,
  '>=': (f, o) => f >= o,
  contains: (f, o) => (new RegExp(o, 'i')).test(f),
  icontains: (f, o) => !(new RegExp(o, 'i')).test(f),
};

const tryParseNumber = n => (isNaN(Number(n)) ? n : Number(n));

export const compile = ({
  operator,
  operand,
}) => f => operatorFns[operator](f, tryParseNumber(operand));
