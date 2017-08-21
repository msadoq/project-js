// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const validityState = require('../ccsds_mc/validityState');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.encode(data.name)
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
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? data.validityState
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.decode(data.name)
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
    validityState: (data.validityState !== null && typeof data.validityState !== 'undefined')
      ? { type: 'enum', value: data.validityState, symbol: validityState[data.validityState] }
      : undefined,
  }),
};
