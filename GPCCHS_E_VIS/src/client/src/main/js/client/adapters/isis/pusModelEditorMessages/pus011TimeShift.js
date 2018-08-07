// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const iNTEGER = require('../ccsds_mal/iNTEGER');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? sTRING.encode(data.applicationTime)
      : null,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? iNTEGER.encode(data.timeShiftOffset)
      : null,
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uINTEGER.encode(data.lastUpdateMode)
      : null,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? sTRING.encode(data.lastUpdateTime)
      : null,
  }),
  decode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? sTRING.decode(data.applicationTime)
      : undefined,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? iNTEGER.decode(data.timeShiftOffset)
      : undefined,
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateMode)
      : undefined,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? sTRING.decode(data.lastUpdateTime)
      : undefined,
  }),
};
