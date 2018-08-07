// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus012MonitoringCheckProperties = require('./pus012MonitoringCheckProperties.stub');

const pus012ParameterMonitoringDefinition = {
  monitoringId: 100,
  monitoringIdLabel: 'mySTRING',
  monitoringName: 'mySTRING',
  parameterId: 100,
  parameterName: 100,
  monitoringStatus: 100,
  protectionStatus: 'mySTRING',
  monitoringInterval: 100,
  repetitionNumber: 100,
  checkType: 'mySTRING',
  validityParameterId: 100,
  validityParameterName: 'mySTRING',
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  pus012MonitoringCheckPropertiesLow: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesHigh: getPus012MonitoringCheckProperties(),
  pus012MonitoringCheckPropertiesExpected: getPus012MonitoringCheckProperties(),
  isMonitoringIntervalSet: true,
  isRepetitionNumberSet: true,
  lastUpdateModeMonId: 100,
  lastUpdateTimeMonId: 'mySTRING',
  lastUpdateModeParamId: 100,
  lastUpdateTimeParamId: 'mySTRING',
  lastUpdateModeValParamId: 100,
  lastUpdateTimeValParamId: 'mySTRING',
  lastUpdateModeValParamExpectValue: 100,
  lastUpdateTimeValParamExpectValue: 'mySTRING',
  lastUpdateModeValParamMask: 100,
  lastUpdateTimeValParamMask: 'mySTRING',
  lastUpdateModeMonInterval: 100,
  lastUpdateTimeMonInterval: 'mySTRING',
  lastUpdateModeRepetition: 100,
  lastUpdateTimeRepetition: 'mySTRING',
  lastUpdateModeCheckType: 100,
  lastUpdateTimeCheckType: 'mySTRING',
  lastUpdateModeMonStatus: 100,
  lastUpdateTimeMonStatus: 'mySTRING',
  lastUpdateModeProtectionStatus: 100,
  lastUpdateTimeProtectionStatus: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus012ParameterMonitoringDefinition) : pus012ParameterMonitoringDefinition);
