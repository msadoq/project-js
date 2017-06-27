// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? tIME.encode(data.startTime)
      : null,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? tIME.encode(data.endTime)
      : null,
    valueTime: (data.valueTime !== null && typeof data.valueTime !== 'undefined')
      ? tIME.encode(data.valueTime)
      : null,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.encode(data.value)
      : null,
    sampleCount: (data.sampleCount !== null && typeof data.sampleCount !== 'undefined')
      ? uINTEGER.encode(data.sampleCount)
      : null,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.encode(data.timestamp)
      : null,
  }),
  decode: data => ({
    startTime: (data.startTime !== null && typeof data.startTime !== 'undefined')
      ? tIME.decode(data.startTime)
      : undefined,
    endTime: (data.endTime !== null && typeof data.endTime !== 'undefined')
      ? tIME.decode(data.endTime)
      : undefined,
    valueTime: (data.valueTime !== null && typeof data.valueTime !== 'undefined')
      ? tIME.decode(data.valueTime)
      : undefined,
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.decode(data.value)
      : undefined,
    sampleCount: (data.sampleCount !== null && typeof data.sampleCount !== 'undefined')
      ? uINTEGER.decode(data.sampleCount)
      : undefined,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.decode(data.timestamp)
      : undefined,
  }),
};
