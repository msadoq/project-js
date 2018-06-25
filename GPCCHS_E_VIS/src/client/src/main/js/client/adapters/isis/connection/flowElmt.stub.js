// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getCUIdentifier = require('./cUIdentifier.stub');
const getFlowIdentifier = require('./flowIdentifier.stub');
const getProcessIdentifier = require('./processIdentifier.stub');

const flowElmt = {
  flowIdentifier: getFlowIdentifier(),
  cUIdentifiers: [getCUIdentifier(), getCUIdentifier()],
  processIdentifiers: [getProcessIdentifier(), getProcessIdentifier()],
};

module.exports = override => (override ? _defaultsDeep({}, override, flowElmt) : flowElmt);
