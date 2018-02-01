// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const flowElmt = require('./flowElmt');

module.exports = {
  encode: data => ({
    flowElmts: _map(data.flowElmts, d => (flowElmt.encode(d))),
  }),
  decode: data => ({
    flowElmts: _map(data.flowElmts, d => (flowElmt.decode(d))),
  }),
};
