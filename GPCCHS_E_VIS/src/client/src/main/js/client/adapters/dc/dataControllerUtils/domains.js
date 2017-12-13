// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _map = require('lodash/map');

const domain = require('./domain');

module.exports = {
  encode: data => ({
    domains: _map(data.domains, d => domain.encode(d)),
  }),
  decode: data => ({
    domains: _map(data.domains, d => domain.decode(d)),
  }),
};
