// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const briefcaseContent = require('./briefcaseContent');
const lONG = require('../ccsds_mal/lONG');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? lONG.encode(data.uid)
      : null,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.encode(data.timestamp)
      : null,
    base: (data.base !== null && typeof data.base !== 'undefined')
      ? briefcaseContent.encode(data.base)
      : null,
  }),
  decode: data => ({
    uid: (data.uid !== null && typeof data.uid !== 'undefined')
      ? lONG.decode(data.uid)
      : undefined,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.decode(data.timestamp)
      : undefined,
    base: (data.base !== null && typeof data.base !== 'undefined')
      ? briefcaseContent.decode(data.base)
      : undefined,
  }),
};
