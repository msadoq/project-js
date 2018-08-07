// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const tIME = require('../ccsds_mal/tIME');
const uINTEGER = require('../ccsds_mal/uINTEGER');

module.exports = {
  encode: data => ({
    dataType: (data.dataType !== null && typeof data.dataType !== 'undefined')
      ? uINTEGER.encode(data.dataType)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    payload: (data.payload !== null && typeof data.payload !== 'undefined')
      ? bLOB.encode(data.payload)
      : null,
  }),
  decode: data => ({
    dataType: (data.dataType !== null && typeof data.dataType !== 'undefined')
      ? uINTEGER.decode(data.dataType)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    payload: (data.payload !== null && typeof data.payload !== 'undefined')
      ? bLOB.decode(data.payload)
      : undefined,
  }),
};
