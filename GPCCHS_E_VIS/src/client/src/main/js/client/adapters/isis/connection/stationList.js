// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const stationElmt = require('./stationElmt');

module.exports = {
  encode: data => ({
    stationElmts: _map(data.stationElmts, d => (stationElmt.encode(d))),
  }),
  decode: data => ({
    stationElmts: _map(data.stationElmts, d => (stationElmt.decode(d))),
  }),
};
