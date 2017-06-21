// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus012Model = {
  apid: 100,
  pus012ParameterMonitoringDefinition: [getPus012ParameterMonitoringDefinition(), getPus012ParameterMonitoringDefinition()],
  noOfParameterMonitoringDefinition: 100,
  serviceStatus: 100,
  groundDate: now,
  pusElement: getPusElement(),
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012Model) : pus012Model);
