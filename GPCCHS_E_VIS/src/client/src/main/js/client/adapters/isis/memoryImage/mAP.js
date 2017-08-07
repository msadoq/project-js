// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const mAPData = require('./mAPData');

module.exports = {
  encode: data => ({
    data: _map(data.data, d => (mAPData.encode(d))),
  }),
  decode: data => ({
    data: _map(data.data, d => (mAPData.decode(d))),
  }),
};
