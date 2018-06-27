// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const statValue = require('./statValue');
const tIME = require('../ccsds_mal/tIME');

module.exports = {
  encode: data => ({
    statDate: (data.statDate !== null && typeof data.statDate !== 'undefined')
      ? tIME.encode(data.statDate)
      : null,
    statValue: _map(data.statValue, d => (statValue.encode(d))),
  }),
  decode: data => ({
    statDate: (data.statDate !== null && typeof data.statDate !== 'undefined')
      ? tIME.decode(data.statDate)
      : undefined,
    statValue: _map(data.statValue, d => (statValue.decode(d))),
    referenceTimestamp: (data.statDate !== null && typeof data.statDate !== 'undefined')
        ? { type: 'time', value: data.statDate.value.toNumber() }
        : undefined,
  }),
};
