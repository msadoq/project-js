// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('./aTTRIBUTE');
const uSHORT = require('./uSHORT');

module.exports = {
  encode: data => ({
    _index: (data._index !== null && typeof data._index !== 'undefined')
      ? uSHORT.encode(data._index)
      : null,
    _value: (data._value !== null && typeof data._value !== 'undefined')
      ? aTTRIBUTE.encode(data._value)
      : null,
  }),
  decode: data => ({
    _index: (data._index !== null && typeof data._index !== 'undefined')
      ? uSHORT.decode(data._index)
      : undefined,
    _value: (data._value !== null && typeof data._value !== 'undefined')
      ? aTTRIBUTE.decode(data._value)
      : undefined,
  }),
};
