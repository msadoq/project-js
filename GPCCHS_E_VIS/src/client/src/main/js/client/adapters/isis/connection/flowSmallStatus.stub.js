// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getCUFullStatus = require('./cUFullStatus.stub');
const getProcessFullState = require('./processFullState.stub');

const flowSmallStatus = {
  state: 0,
  connectionStates: [getCUFullStatus(), getCUFullStatus()],
  processFullState: [getProcessFullState(), getProcessFullState()],
};

module.exports = override => (override ? _defaultsDeep({}, override, flowSmallStatus) : flowSmallStatus);
