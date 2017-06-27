// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const securityStatus = require('./securityStatus');

module.exports = {
  encode: data => ({
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? bLOB.encode(data.rawData)
      : null,
    securityStatus: (data.securityStatus !== null && typeof data.securityStatus !== 'undefined')
      ? data.securityStatus
      : null,
  }),
  decode: data => ({
    rawData: (data.rawData !== null && typeof data.rawData !== 'undefined')
      ? bLOB.decode(data.rawData)
      : undefined,
    securityStatus: (data.securityStatus !== null && typeof data.securityStatus !== 'undefined')
      ? { type: 'enum', value: data.securityStatus, symbol: securityStatus[data.securityStatus] }
      : undefined,
  }),
};
