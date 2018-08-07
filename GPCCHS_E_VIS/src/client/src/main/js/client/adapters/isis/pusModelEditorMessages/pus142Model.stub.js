// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus142FunctionalMonitoring = require('./pus142FunctionalMonitoring.stub');

const pus142Model = {
  serviceStatus: 100,
  pus142FunctionalMonitoring: [getPus142FunctionalMonitoring(), getPus142FunctionalMonitoring()],
  status: 100,
  lastUpdateModeServiceStatus: 100,
  lastUpdateTimeServiceStatus: 'mySTRING',
  uniqueId: 1000,
  serviceApid: 100,
  serviceApidName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142Model) : pus142Model);
