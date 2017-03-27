// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');
const getPus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
  fmonId: 100,
  protectionStatus: 100,
  status: 100,
  checkingStatus: 100,
  rid: 100,
  pus142ParameterMonitoringDefinition: [getPus142ParameterMonitoringDefinition(), getPus142ParameterMonitoringDefinition()],
  validityParameterId: 100,
  validityParameterMask: 100,
  validityParameterExpectedValue: _random(1, 100, true),
  pusElement: getPusElement(),
}, override);

