const _string = require('../ccsds_mal/sTRING');
const uinteger = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
    ? uinteger.encode(data.parameterId)
    : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
    ? _string.encode(data.parameterName)
    : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
    ? _string.encode(data.value)
    : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
    ? uinteger.decode(data.parameterId)
    : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
    ? _string.decode(data.parameterName)
    : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
    ? _string.decode(data.value)
    : null,
  }),
};
