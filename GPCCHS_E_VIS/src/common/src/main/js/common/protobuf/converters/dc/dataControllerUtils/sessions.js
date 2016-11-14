const { map: _map } = require('lodash');
const session = require('./session');

module.exports = {
  encode: data => ({
    sessions: _map(data.sessions, d => session.encode(d)),
  }),
  decode: data => ({
    sessions: _map(data.sessions, d => session.decode(d)),
  }),
};
