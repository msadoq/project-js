// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _map = require('lodash/map');

const session = require('./session');

module.exports = {
  encode: data => ({
    sessions: _map(data.sessions, d => session.encode(d)),
  }),
  decode: data => ({
    sessions: _map(data.sessions, d => session.decode(d)),
  }),
};
