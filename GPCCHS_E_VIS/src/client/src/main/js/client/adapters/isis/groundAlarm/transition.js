// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

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
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.encode(data.extractedValue)
      : null,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.encode(data.rawValue)
      : null,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.encode(data.monitoringState)
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
    extractedValue: (data.extractedValue !== null && typeof data.extractedValue !== 'undefined')
      ? aTTRIBUTE.decode(data.extractedValue)
      : undefined,
    rawValue: (data.rawValue !== null && typeof data.rawValue !== 'undefined')
      ? aTTRIBUTE.decode(data.rawValue)
      : undefined,
    monitoringState: (data.monitoringState !== null && typeof data.monitoringState !== 'undefined')
      ? sTRING.decode(data.monitoringState)
      : undefined,
  }),
};
