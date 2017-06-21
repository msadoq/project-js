// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const sTRING = require('../ccsds_mal/sTRING');
const uSHORT = require('../ccsds_mal/uSHORT');
const validityState = require('./validityState');

module.exports = {
  encode: data => ({
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.convertedValue)
      : null,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.extractedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.encode(data.rawValue)
      : null,
    isObsolete: (data.isObsolete !== null && typeof data.isObsolete !== 'undefined')
      ? bOOLEAN.encode(data.isObsolete)
      : null,
    triggerOnCounter: (data.triggerOnCounter !== null && typeof data.triggerOnCounter !== 'undefined')
      ? uSHORT.encode(data.triggerOnCounter)
      : null,
    triggerOffCounter: (data.triggerOffCounter !== null && typeof data.triggerOffCounter !== 'undefined')
      ? uSHORT.encode(data.triggerOffCounter)
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.encode(data.monitoringState)
      : null,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
  }),
  decode: data => ({
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.convertedValue)
      : undefined,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.extractedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.decode(data.rawValue)
      : undefined,
    isObsolete: (data.isObsolete !== null && typeof data.isObsolete !== 'undefined')
      ? bOOLEAN.decode(data.isObsolete)
      : undefined,
    triggerOnCounter: (data.triggerOnCounter !== null && typeof data.triggerOnCounter !== 'undefined')
      ? uSHORT.decode(data.triggerOnCounter)
      : undefined,
    triggerOffCounter: (data.triggerOffCounter !== null && typeof data.triggerOffCounter !== 'undefined')
      ? uSHORT.decode(data.triggerOffCounter)
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.decode(data.monitoringState)
      : undefined,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
  }),
};
