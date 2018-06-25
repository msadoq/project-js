// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus012ParameterMonitoringDefinition = {
  monitoringId: 100,
  parameterId: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  parameterCurrentValue: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  monitoringInterval: 100,
  repetitionNumber: 100,
  checkType: 100,
  monitoringStatus: 100,
  pus012MonitoringCheckPropertiesLow: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesHigh: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesExpected: getPus012MonitoringCheckProperties(),
  pusElement: getPusElement(),
  monitoringIdLabel: 'mySTRING',
  protectionStatus: 'mySTRING',
  isMonitoringIntervalSet: true,
  isRepetitionNumberSet: true,
  lastUpdateModeMonId: 100,
  lastUpdateTimeMonId: now,
  lastUpdateModeParamId: 100,
  lastUpdateTimeParamId: now,
  lastUpdateModeValParamId: 100,
  lastUpdateTimeValParamId: now,
  lastUpdateModeParamCurrentValue: 100,
  lastUpdateTimeParamCurrentValue: now,
  lastUpdateModeValParamExpectValue: 100,
  lastUpdateTimeValParamExpectValue: now,
  lastUpdateModeValParamMask: 100,
  lastUpdateTimeValParamMask: now,
  lastUpdateModeMonInterval: 100,
  lastUpdateTimeMonInterval: now,
  lastUpdateModeRepetition: 100,
  lastUpdateTimeRepetition: now,
  lastUpdateModeCheckType: 100,
  lastUpdateTimeCheckTime: now,
  lastUpdateModeMonStatus: 100,
  lastUpdateTimeMonStatus: now,
  lastUpdateModeProtectionStatus: 100,
  lastUpdateTimeProtectionStatus: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012ParameterMonitoringDefinition) : pus012ParameterMonitoringDefinition);
