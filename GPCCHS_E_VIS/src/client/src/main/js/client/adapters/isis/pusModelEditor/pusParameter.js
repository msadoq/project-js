// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.encode(data.parameterId)
      : null,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.encode(data.parameterName)
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.encode(data.value)
      : null,
  }),
  decode: data => ({
    parameterId: (data.parameterId !== null && typeof data.parameterId !== 'undefined')
      ? uINTEGER.decode(data.parameterId)
      : undefined,
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.decode(data.parameterName)
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? sTRING.decode(data.value)
      : undefined,
  }),
};
