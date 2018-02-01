// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.encode(data.name)
      : null,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.encode(data.description)
      : null,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.encode(data.timestamp)
      : null,
  }),
  decode: data => ({
    name: (data.name !== null && typeof data.name !== 'undefined')
      ? iDENTIFIER.decode(data.name)
      : undefined,
    description: (data.description !== null && typeof data.description !== 'undefined')
      ? sTRING.decode(data.description)
      : undefined,
    timestamp: (data.timestamp !== null && typeof data.timestamp !== 'undefined')
      ? tIME.decode(data.timestamp)
      : undefined,
  }),
};
