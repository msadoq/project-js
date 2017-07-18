// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition.stub');
const getPusElement = require('./pusElement.stub');

const pus142FunctionalMonitoring = {
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
  ridLabel: 'mySTRING',
  fmonIdLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142FunctionalMonitoring) : pus142FunctionalMonitoring);
