const uINTEGER = require('../ccsds_mal/uINTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

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
      ? sTRING.encode(data.parameterName)
      : undefined,
    parameterValue: (data.parameterValue !== null && typeof data.parameterValue !== 'undefined')
      ? sTRING.encode(data.parameterValue)
      : undefined,
    parameterDescription: (data.parameterDescription !== null && typeof data.parameterDescription !== 'undefined')
      ? sTRING.encode(data.parameterDescription)
      : undefined,
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateMode)
      : undefined,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? sTRING.encode(data.lastUpdateTime)
      : undefined,
  }),
};
