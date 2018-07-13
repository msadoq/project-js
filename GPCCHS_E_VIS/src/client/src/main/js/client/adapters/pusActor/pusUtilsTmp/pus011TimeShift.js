const uINTEGER = require('../ccsds_mal/uINTEGER');
const tIME = require('../ccsds_mal/tIME');
const sTRING = require('../ccsds_mal/sTRING');


module.exports = {
  encode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? tIME.encode(data.applicationTime)
      : null,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? uINTEGER.encode(data.timeShiftOffset)
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
      ? tIME.decode(data.applicationTime)
      : undefined,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? uINTEGER.decode(data.timeShiftOffset)
      : undefined,
    lastUpdateMode: (data.lastUpdateMode !== null && typeof data.lastUpdateMode !== 'undefined')
      ? uINTEGER.decode(data.lastUpdateMode)
      : undefined,
    lastUpdateTime: (data.lastUpdateTime !== null && typeof data.lastUpdateTime !== 'undefined')
      ? sTRING.decode(data.lastUpdateTime)
      : undefined,
  }),
};
