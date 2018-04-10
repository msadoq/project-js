// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const operationStatus = require('./operationStatus');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    operationStatus: (data.operationStatus !== null && typeof data.operationStatus !== 'undefined')
      ? data.operationStatus
      : null,
    occurenceDate: (data.occurenceDate !== null && typeof data.occurenceDate !== 'undefined')
      ? tIME.encode(data.occurenceDate)
      : null,
  }),
  decode: data => ({
    operationStatus: (data.operationStatus !== null && typeof data.operationStatus !== 'undefined')
      ? { type: 'enum', value: data.operationStatus, symbol: operationStatus[data.operationStatus] }
      : undefined,
    occurenceDate: (data.occurenceDate !== null && typeof data.occurenceDate !== 'undefined')
      ? tIME.decode(data.occurenceDate)
      : undefined,
  }),
};
