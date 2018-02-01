// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');
const uSHORT = require('../ccsds_mal/uSHORT');
const validityState = require('../ccsds_mc/validityState');

module.exports = {
  encode: data => ({
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? tIME.encode(data.onboardDate)
      : null,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.encode(data.groundDate)
      : null,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.convertedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.encode(data.rawValue)
      : null,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.extractedValue)
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.encode(data.monitoringState)
      : null,
    triggerOnCounter: (data.triggerOnCounter !== null && typeof data.triggerOnCounter !== 'undefined')
      ? uSHORT.encode(data.triggerOnCounter)
      : null,
    triggerOffCounter: (data.triggerOffCounter !== null && typeof data.triggerOffCounter !== 'undefined')
      ? uSHORT.encode(data.triggerOffCounter)
      : null,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
    isObsolete: (data.isObsolete !== null && typeof data.isObsolete !== 'undefined')
      ? bOOLEAN.encode(data.isObsolete)
      : null,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? bOOLEAN.encode(data.isNominal)
      : null,
  }),
  decode: data => ({
    onboardDate: (data.onboardDate !== null && typeof data.onboardDate !== 'undefined')
      ? tIME.decode(data.onboardDate)
      : undefined,
    groundDate: (data.groundDate !== null && typeof data.groundDate !== 'undefined')
      ? tIME.decode(data.groundDate)
      : undefined,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.convertedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.decode(data.rawValue)
      : undefined,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.extractedValue)
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.decode(data.monitoringState)
      : undefined,
    triggerOnCounter: (data.triggerOnCounter !== null && typeof data.triggerOnCounter !== 'undefined')
      ? uSHORT.decode(data.triggerOnCounter)
      : undefined,
    triggerOffCounter: (data.triggerOffCounter !== null && typeof data.triggerOffCounter !== 'undefined')
      ? uSHORT.decode(data.triggerOffCounter)
      : undefined,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
    isObsolete: (data.isObsolete !== null && typeof data.isObsolete !== 'undefined')
      ? bOOLEAN.decode(data.isObsolete)
      : undefined,
    isNominal: (data.isNominal !== null && typeof data.isNominal !== 'undefined')
      ? bOOLEAN.decode(data.isNominal)
      : undefined,
  }),
};
