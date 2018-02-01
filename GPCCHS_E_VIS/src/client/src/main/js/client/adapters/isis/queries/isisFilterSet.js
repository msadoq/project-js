// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const compositeFilter = require('../ccsds_com/compositeFilter');
const namedValue = require('../ccsds_mal/namedValue');
const sTRING = require('../ccsds_mal/sTRING');

module.exports = {
  encode: data => ({
    compositeFilter: _map(data.compositeFilter, d => (compositeFilter.encode(d))),
    mapFunction: (data.mapFunction !== null && typeof data.mapFunction !== 'undefined')
      ? sTRING.encode(data.mapFunction)
      : null,
    functionAttributes: _map(data.functionAttributes, d => (namedValue.encode(d))),
  }),
  decode: data => ({
    compositeFilter: _map(data.compositeFilter, d => (compositeFilter.decode(d))),
    mapFunction: (data.mapFunction !== null && typeof data.mapFunction !== 'undefined')
      ? sTRING.decode(data.mapFunction)
      : undefined,
    functionAttributes: _map(data.functionAttributes, d => (namedValue.decode(d))),
  }),
};
