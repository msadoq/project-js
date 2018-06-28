// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _map = require('lodash/map');
const cUFullStatus = require('./cUFullStatus');
const processFullState = require('./processFullState');
const synthesisState = require('./synthesisState');

module.exports = {
  encode: data => ({
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? data.state
      : null,
    connectionStates: _map(data.connectionStates, d => (cUFullStatus.encode(d))),
    processFullState: _map(data.processFullState, d => (processFullState.encode(d))),
  }),
  decode: data => ({
    state: (data.state !== null && typeof data.state !== 'undefined')
      ? { type: 'enum', value: data.state, symbol: synthesisState[data.state] }
      : undefined,
    connectionStates: _map(data.connectionStates, d => (cUFullStatus.decode(d))),
    processFullState: _map(data.processFullState, d => (processFullState.decode(d))),
  }),
};
