// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const tIME = require('../ccsds_mal/tIME');
const uCPParameter = require('./uCPParameter');

module.exports = {
  encode: data => ({
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? tIME.encode(data.date)
      : null,
    parameters: _map(data.parameters, d => (uCPParameter.encode(d))),
  }),
  decode: data => ({
    date: (data.date !== null && typeof data.date !== 'undefined')
      ? tIME.decode(data.date)
      : undefined,
    parameters: _map(data.parameters, d => (uCPParameter.decode(d))),
    referenceTimestamp: (data.date !== null && typeof data.date !== 'undefined')
        ? { type: 'time', value: data.date.value.toNumber() }
        : undefined,
  }),
};
