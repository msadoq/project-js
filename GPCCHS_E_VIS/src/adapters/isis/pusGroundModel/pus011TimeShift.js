// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const iNTEGER = require('../ccsds_mal/iNTEGER');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? tIME.encode(data.applicationTime)
      : null,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? iNTEGER.encode(data.timeShiftOffset)
      : null,
  }),
  decode: data => ({
    applicationTime: (data.applicationTime !== null && typeof data.applicationTime !== 'undefined')
      ? tIME.decode(data.applicationTime)
      : undefined,
    timeShiftOffset: (data.timeShiftOffset !== null && typeof data.timeShiftOffset !== 'undefined')
      ? iNTEGER.decode(data.timeShiftOffset)
      : undefined,
  }),
};
