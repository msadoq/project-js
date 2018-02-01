// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const flowFullStatus = require('./flowFullStatus');
const synthesisState = require('./synthesisState');

module.exports = {
  encode: data => ({
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? data.state
      : null,
    flowStates: _map(data.flowStates, d => (flowFullStatus.encode(d))),
  }),
  decode: data => ({
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { type: 'enum', value: data.state, symbol: synthesisState[data.state] }
      : undefined,
    flowStates: _map(data.flowStates, d => (flowFullStatus.decode(d))),
  }),
};
