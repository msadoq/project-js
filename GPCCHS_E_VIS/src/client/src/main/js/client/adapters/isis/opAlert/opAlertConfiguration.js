// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const dURATION = require('../ccsds_mal/dURATION');
const iNTEGER = require('../ccsds_mal/iNTEGER');

module.exports = {
  encode: data => ({
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? iNTEGER.encode(data.numberCalls)
      : null,
    alertByPHONE: (data.alertByPHONE !== null && typeof data.alertByPHONE !== 'undefined')
      ? bOOLEAN.encode(data.alertByPHONE)
      : null,
    alertByAUDIO: (data.alertByAUDIO !== null && typeof data.alertByAUDIO !== 'undefined')
      ? bOOLEAN.encode(data.alertByAUDIO)
      : null,
    alertByEMAIL: (data.alertByEMAIL !== null && typeof data.alertByEMAIL !== 'undefined')
      ? bOOLEAN.encode(data.alertByEMAIL)
      : null,
    alertBySMS: (data.alertBySMS !== null && typeof data.alertBySMS !== 'undefined')
      ? bOOLEAN.encode(data.alertBySMS)
      : null,
    maxNumberRetries: (data.maxNumberRetries !== null && typeof data.maxNumberRetries !== 'undefined')
      ? iNTEGER.encode(data.maxNumberRetries)
      : null,
    delayRetries: (data.delayRetries !== null && typeof data.delayRetries !== 'undefined')
      ? dURATION.encode(data.delayRetries)
      : null,
  }),
  decode: data => ({
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? iNTEGER.decode(data.numberCalls)
      : undefined,
    alertByPHONE: (data.alertByPHONE !== null && typeof data.alertByPHONE !== 'undefined')
      ? bOOLEAN.decode(data.alertByPHONE)
      : undefined,
    alertByAUDIO: (data.alertByAUDIO !== null && typeof data.alertByAUDIO !== 'undefined')
      ? bOOLEAN.decode(data.alertByAUDIO)
      : undefined,
    alertByEMAIL: (data.alertByEMAIL !== null && typeof data.alertByEMAIL !== 'undefined')
      ? bOOLEAN.decode(data.alertByEMAIL)
      : undefined,
    alertBySMS: (data.alertBySMS !== null && typeof data.alertBySMS !== 'undefined')
      ? bOOLEAN.decode(data.alertBySMS)
      : undefined,
    maxNumberRetries: (data.maxNumberRetries !== null && typeof data.maxNumberRetries !== 'undefined')
      ? iNTEGER.decode(data.maxNumberRetries)
      : undefined,
    delayRetries: (data.delayRetries !== null && typeof data.delayRetries !== 'undefined')
      ? dURATION.decode(data.delayRetries)
      : undefined,
  }),
};
