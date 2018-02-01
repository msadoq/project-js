// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const lONG = require('../ccsds_mal/lONG');
const statisticValueStruct = require('./statisticValueStruct');

module.exports = {
  encode: data => ({
    function: (data.function !== null && typeof data.function !== 'undefined')
      ? lONG.encode(data.function)
      : null,
    value: _map(data.value, d => (statisticValueStruct.encode(d))),
  }),
  decode: data => ({
    function: (data.function !== null && typeof data.function !== 'undefined')
      ? lONG.decode(data.function)
      : undefined,
    value: _map(data.value, d => (statisticValueStruct.decode(d))),
  }),
};
