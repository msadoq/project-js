// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const applyOverride = require('../../applyOverride');
const getPus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties');
const getPusElement = require('./pusElement');

module.exports = override => applyOverride({
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
}, override);

