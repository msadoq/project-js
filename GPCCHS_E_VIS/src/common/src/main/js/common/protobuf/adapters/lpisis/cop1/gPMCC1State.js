// Generated file
const _map = require('lodash/map');
const proccessedTC = require('./proccessedTC');

module.exports = {
  encode: data => ({
    proccessedTC: _map(data.proccessedTC, d => (proccessedTC.encode(d))),
  }),
  decode: data => ({
    proccessedTC: _map(data.proccessedTC, d => (proccessedTC.decode(d))),
  }),
};

