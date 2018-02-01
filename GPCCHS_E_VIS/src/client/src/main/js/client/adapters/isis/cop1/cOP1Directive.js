// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');
const directiveIdentifier = require('./directiveIdentifier');

module.exports = {
  encode: data => ({
    attribute: (data.attribute !== null && typeof data.attribute !== 'undefined')
      ? aTTRIBUTE.encode(data.attribute)
      : null,
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? data.id
      : null,
  }),
  decode: data => ({
    attribute: (data.attribute !== null && typeof data.attribute !== 'undefined')
      ? aTTRIBUTE.decode(data.attribute)
      : undefined,
    id: (data.id !== null && typeof data.id !== 'undefined')
      ? { type: 'enum', value: data.id, symbol: directiveIdentifier[data.id] }
      : undefined,
  }),
};
