// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const lONG = require('../ccsds_mal/lONG');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.encode(data.name)
      : null,
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? lONG.encode(data.uid)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? sTRING.decode(data.name)
      : undefined,
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? lONG.decode(data.uid)
      : undefined,
  }),
};
