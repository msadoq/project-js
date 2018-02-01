// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties.stub');
const getPusElement = require('./pusElement.stub');

const pus012ParameterMonitoringDefinition = {
  monitoringId: 100,
  parameterId: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  parameterCurrentValue: _random(1, 100, true),
  validityParameterExpectedValue: _random(1, 100, true),
  monitoringInterval: 100,
  repetitionNumber: 100,
  checkType: 100,
  monitoringStatus: 100,
  pus012MonitoringCheckPropertiesLow: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesHigh: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesExpected: getPus012MonitoringCheckProperties(),
  pusElement: getPusElement(),
  monitoringIdLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012ParameterMonitoringDefinition) : pus012ParameterMonitoringDefinition);
