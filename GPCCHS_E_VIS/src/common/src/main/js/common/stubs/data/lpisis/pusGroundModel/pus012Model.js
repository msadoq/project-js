// Produced by Acceleo JavaScript Generator 1.1.0
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');
const getPus012ParameterMonitoringDefinition = require('./pus012ParameterMonitoringDefinition');
const getPusElement = require('./pusElement');

const now = _now();

module.exports = override => applyOverride({
  apid: 100,
  pus012ParameterMonitoringDefinition: [getPus012ParameterMonitoringDefinition(), getPus012ParameterMonitoringDefinition()],
  noOfParameterMonitoringDefinition: 100,
  serviceStatus: 100,
  groundDate: now,
  pusElement: getPusElement(),
}, override);

