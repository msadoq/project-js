// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const pusValue = require('./pusValue');

module.exports = {
  encode: data => ({
    pusValue: _map(data.pusValue, d => (pusValue.encode(d))),
  }),
  decode: data => ({
    pusValue: _map(data.pusValue, d => (pusValue.decode(d))),
  }),
};
