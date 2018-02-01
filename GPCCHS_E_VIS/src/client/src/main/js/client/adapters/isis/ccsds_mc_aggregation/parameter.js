// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const bLOB = require('../ccsds_mal/bLOB');
const objectId = require('../ccsds_com/objectId');
const sTRING = require('../ccsds_mal/sTRING');
const uSHORT = require('../ccsds_mal/uSHORT');
const validityState = require('../ccsds_mc/validityState');

module.exports = {
  encode: data => ({
    definition: (data.definition !== null && typeof data.definition !== 'undefined')
      ? bLOB.encode(objectId.encodeRaw(data.definition))
      : null,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.extractedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.encode(data.rawValue)
      : null,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.convertedValue)
      : null,
    triggerCounter: (data.triggerCounter !== null && typeof data.triggerCounter !== 'undefined')
      ? uSHORT.encode(data.triggerCounter)
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.encode(data.monitoringState)
      : null,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
  }),
  decode: data => ({
    definition: (data.definition !== null && typeof data.definition !== 'undefined')
      ? objectId.decodeRaw(bLOB.decode(data.definition).value)
      : undefined,
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.extractedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.decode(data.rawValue)
      : undefined,
    convertedValue: (data.convertedValue !== null && typeof data.convertedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.convertedValue)
      : undefined,
    triggerCounter: (data.triggerCounter !== null && typeof data.triggerCounter !== 'undefined')
      ? uSHORT.decode(data.triggerCounter)
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.decode(data.monitoringState)
      : undefined,
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
  }),
};
