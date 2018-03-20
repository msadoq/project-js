// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const namedValue = require('../ccsds_mal/namedValue');
const opAlertClosingData = require('./opAlertClosingData');
const opAlertConfiguration = require('./opAlertConfiguration');
const sTRING = require('../ccsds_mal/sTRING');
const status = require('./status');
const tIME = require('../ccsds_mal/tIME');
const uLONG = require('../ccsds_mal/uLONG');

module.exports = {
  encode: data => ({
    onCallOperator: (data.onCallOperator !== null && typeof data.onCallOperator !== 'undefined')
      ? sTRING.encode(data.onCallOperator)
      : null,
    specificAttributes: (data.specificAttributes !== null && typeof data.specificAttributes !== 'undefined')
      ? namedValue.encode(data.specificAttributes)
      : null,
    closingNeeded: (data.closingNeeded !== null && typeof data.closingNeeded !== 'undefined')
      ? bOOLEAN.encode(data.closingNeeded)
      : null,
    alertConfiguration: (data.alertConfiguration !== null && typeof data.alertConfiguration !== 'undefined')
      ? opAlertConfiguration.encode(data.alertConfiguration)
      : null,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? data.status
      : null,
    lastCallDate: (data.lastCallDate !== null && typeof data.lastCallDate !== 'undefined')
      ? tIME.encode(data.lastCallDate)
      : null,
    alertClosingData: (data.alertClosingData !== null && typeof data.alertClosingData !== 'undefined')
      ? opAlertClosingData.encode(data.alertClosingData)
      : null,
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? iNTEGER.encode(data.numberCalls)
      : null,
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.encode(data.creationDate)
      : null,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.encode(data.satellite)
      : null,
  }),
  decode: data => ({
    onCallOperator: (data.onCallOperator !== null && typeof data.onCallOperator !== 'undefined')
      ? sTRING.decode(data.onCallOperator)
      : undefined,
    specificAttributes: (data.specificAttributes !== null && typeof data.specificAttributes !== 'undefined')
      ? namedValue.decode(data.specificAttributes)
      : undefined,
    closingNeeded: (data.closingNeeded !== null && typeof data.closingNeeded !== 'undefined')
      ? bOOLEAN.decode(data.closingNeeded)
      : undefined,
    alertConfiguration: (data.alertConfiguration !== null && typeof data.alertConfiguration !== 'undefined')
      ? opAlertConfiguration.decode(data.alertConfiguration)
      : undefined,
    status: (data.status !== null && typeof data.status !== 'undefined')
      ? { type: 'enum', value: data.status, symbol: status[data.status] }
      : undefined,
    lastCallDate: (data.lastCallDate !== null && typeof data.lastCallDate !== 'undefined')
      ? tIME.decode(data.lastCallDate)
      : undefined,
    alertClosingData: (data.alertClosingData !== null && typeof data.alertClosingData !== 'undefined')
      ? opAlertClosingData.decode(data.alertClosingData)
      : undefined,
    numberCalls: (data.numberCalls !== null && typeof data.numberCalls !== 'undefined')
      ? iNTEGER.decode(data.numberCalls)
      : undefined,
    creationDate: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
      ? tIME.decode(data.creationDate)
      : undefined,
    satellite: (data.satellite !== null && typeof data.satellite !== 'undefined')
      ? uLONG.decode(data.satellite)
      : undefined,
    referenceTimestamp: (data.creationDate !== null && typeof data.creationDate !== 'undefined')
        ? { type: 'time', value: data.creationDate.value.toNumber() }
        : undefined,
  }),
};
