// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const compositeFilter = require('./compositeFilter');

module.exports = {
  encode: data => ({
    compositeFilter: _map(data.compositeFilter, d => (compositeFilter.encode(d))),
  }),
  decode: data => ({
    compositeFilter: _map(data.compositeFilter, d => (compositeFilter.decode(d))),
  }),
};
