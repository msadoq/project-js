// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');

module.exports = {
  encode: data => ({
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? bLOB.encode(data.rawData)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? bOOLEAN.encode(data.status)
      : null,
  }),
  decode: data => ({
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? bLOB.decode(data.rawData)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? bOOLEAN.decode(data.status)
      : undefined,
  }),
};
