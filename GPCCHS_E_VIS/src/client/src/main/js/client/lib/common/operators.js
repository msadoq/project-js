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
