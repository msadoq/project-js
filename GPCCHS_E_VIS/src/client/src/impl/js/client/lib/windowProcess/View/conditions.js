const operators = {
  equals: (f, o) => f === o,
  notEquals: (f, o) => f !== o,
  inf: (f, o) => f < o,
  infOrEq: (f, o) => f <= o,
  sup: (f, o) => f > o,
  supOrEq: (f, o) => f >= o,
  CONTAINS: (f, o) => (new RegExp(o, 'i')).test(f),
  '!CONTAINS': (f, o) => !(new RegExp(o, 'i')).test(f)
};

const tryParseNumber = n => (isNaN(Number(n)) ? n : Number(n));

const compile = ({
  operator,
  operand
}) => f => operators[operator](f, tryParseNumber(operand));

export default {
  compile
};
