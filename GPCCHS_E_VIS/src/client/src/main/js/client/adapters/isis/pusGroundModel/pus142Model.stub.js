// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus142FunctionalMonitoring = require('./pus142FunctionalMonitoring.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus142Model = {
  serviceStatus: 100,
  noOfFunctionalMonitoring: 100,
  pus142FunctionalMonitoring: [getPus142FunctionalMonitoring(), getPus142FunctionalMonitoring()],
  groundDate: now,
  apid: 100,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142Model) : pus142Model);
