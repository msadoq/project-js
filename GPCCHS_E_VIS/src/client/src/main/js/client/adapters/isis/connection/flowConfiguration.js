// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const uRI = require('../ccsds_mal/uRI');

module.exports = {
  encode: data => ({
    configurationFiles: _map(data.configurationFiles, d => (uRI.encode(d))),
    reconnectionDelay: (data.reconnectionDelay !== null && typeof data.reconnectionDelay !== 'undefined')
      ? iNTEGER.encode(data.reconnectionDelay)
      : null,
    reconnectionNumber: (data.reconnectionNumber !== null && typeof data.reconnectionNumber !== 'undefined')
      ? iNTEGER.encode(data.reconnectionNumber)
      : null,
  }),
  decode: data => ({
    configurationFiles: _map(data.configurationFiles, d => (uRI.decode(d))),
    reconnectionDelay: (data.reconnectionDelay !== null && typeof data.reconnectionDelay !== 'undefined')
      ? iNTEGER.decode(data.reconnectionDelay)
      : undefined,
    reconnectionNumber: (data.reconnectionNumber !== null && typeof data.reconnectionNumber !== 'undefined')
      ? iNTEGER.decode(data.reconnectionNumber)
      : undefined,
  }),
};
