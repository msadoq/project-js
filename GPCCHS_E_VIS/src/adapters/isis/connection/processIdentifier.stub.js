// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getProcessInfo = require('./processInfo.stub');

const processIdentifier = {
  processId: -1000,
  functionOId: 'mySTRING',
  processInfo: getProcessInfo(),
};

module.exports = override => (override ? _defaultsDeep({}, override, processIdentifier) : processIdentifier);
