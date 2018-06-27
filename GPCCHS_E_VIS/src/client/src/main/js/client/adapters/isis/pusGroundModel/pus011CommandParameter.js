// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.encode(data.parameterName)
      : null,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? aTTRIBUTE.encode(data.parameterValue)
      : null,
  }),
  decode: data => ({
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.decode(data.parameterName)
      : undefined,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? aTTRIBUTE.decode(data.parameterValue)
      : undefined,
  }),
};
