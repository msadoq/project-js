// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const bLOB = require('../ccsds_mal/bLOB');
const cUState = require('./cUState');

module.exports = {
  encode: data => ({
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? data.state
      : null,
    sLEReport: (data.sLEReport !== null && typeof data.sLEReport !== 'undefined')
      ? bLOB.encode(data.sLEReport)
      : null,
  }),
  decode: data => ({
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { type: 'enum', value: data.state, symbol: cUState[data.state] }
      : undefined,
    sLEReport: (data.sLEReport !== null && typeof data.sLEReport !== 'undefined')
      ? bLOB.decode(data.sLEReport)
      : undefined,
  }),
};
