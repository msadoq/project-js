// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.encode(data.parameterName)
      : null,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? sTRING.encode(data.parameterValue)
      : null,
    parameterDescription: (data.parameterDescription !== null && typeof data.parameterDescription !== 'undefined')
      ? sTRING.encode(data.parameterDescription)
      : null,
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateMode)
      : null,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? sTRING.encode(data.lastUpdateTime)
      : null,
  }),
  decode: data => ({
    parameterName: (data.parameterName !== null && typeof data.parameterName !== 'undefined')
      ? sTRING.decode(data.parameterName)
      : undefined,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? sTRING.decode(data.parameterValue)
      : undefined,
    parameterDescription: (data.parameterDescription !== null && typeof data.parameterDescription !== 'undefined')
      ? sTRING.decode(data.parameterDescription)
      : undefined,
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateMode)
      : undefined,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? sTRING.decode(data.lastUpdateTime)
      : undefined,
  }),
};
