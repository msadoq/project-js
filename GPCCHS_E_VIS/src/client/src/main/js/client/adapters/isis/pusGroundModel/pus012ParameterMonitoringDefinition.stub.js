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
  checkType: 1,
  monitoringStatus: 1,
  pus012MonitoringCheckPropertiesLow: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesHigh: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesExpected: getPus012MonitoringCheckProperties(),
  pusElement: getPusElement(),
  monitoringIdLabel: 'mySTRING',
  protectionStatus: 'mySTRING',
  isMonitoringIntervalSet: true,
  isRepetitionNumberSet: true,
  lastUpdateModeMonId: 1,
  lastUpdateTimeMonId: now,
  lastUpdateModeParamId: 1,
  lastUpdateTimeParamId: now,
  lastUpdateModeValParamId: 1,
  lastUpdateTimeValParamId: now,
  lastUpdateModeParamCurrentValue: 1,
  lastUpdateTimeParamCurrentValue: now,
  lastUpdateModeValParamExpectValue: 1,
  lastUpdateTimeValParamExpectValue: now,
  lastUpdateModeValParamMask: 1,
  lastUpdateTimeValParamMask: now,
  lastUpdateModeMonInterval: 1,
  lastUpdateTimeMonInterval: now,
  lastUpdateModeRepetition: 1,
  lastUpdateTimeRepetition: now,
  lastUpdateModeCheckType: 1,
  lastUpdateTimeCheckTime: now,
  lastUpdateModeMonStatus: 1,
  lastUpdateTimeMonStatus: now,
  lastUpdateModeProtectionStatus: 1,
  lastUpdateTimeProtectionStatus: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012ParameterMonitoringDefinition) : pus012ParameterMonitoringDefinition);
