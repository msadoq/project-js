// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    filename: (data.filename !== null && typeof data.filename !== 'undefined')
      ? sTRING.encode(data.filename)
      : null,
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? sTRING.encode(data.path)
      : null,
  }),
  decode: data => ({
    filename: (data.filename !== null && typeof data.filename !== 'undefined')
      ? sTRING.decode(data.filename)
      : undefined,
    path: (data.path !== null && typeof data.path !== 'undefined')
      ? sTRING.decode(data.path)
      : undefined,
  }),
};
