// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const aTTRIBUTE = require('../ccsds_mal/aTTRIBUTE');

module.exports = {
  encode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.encode(data.value)
      : null,
  }),
  decode: data => ({
    value: (data.value !== null && typeof data.value !== 'undefined')
      ? aTTRIBUTE.decode(data.value)
      : undefined,
  }),
};
