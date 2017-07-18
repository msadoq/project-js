// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getFlowIdentifier = require('./flowIdentifier.stub');
const getFlowStatus = require('./flowStatus.stub');

const flowFullStatus = {
  status: getFlowStatus(),
  identifier: getFlowIdentifier(),
};

module.exports = override => (override ? _defaultsDeep({}, override, flowFullStatus) : flowFullStatus);
