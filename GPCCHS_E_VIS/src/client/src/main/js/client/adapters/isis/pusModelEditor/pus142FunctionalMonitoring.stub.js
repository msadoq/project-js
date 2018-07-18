// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition.stub');

const pus142FunctionalMonitoring = {
  fmonId: 100,
  fmonIdLabel: 'mySTRING',
  fmonName: 'mySTRING',
  status: 100,
  checkingStatus: 'mySTRING',
  protectionStatus: 'mySTRING',
  rid: 100,
  ridLabel: 'mySTRING',
  packetName: 'mySTRING',
  ridStatus: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  pus142ParameterMonitoringDefinition: [getPus142ParameterMonitoringDefinition(), getPus142ParameterMonitoringDefinition()],
  lastUpdateModeFMonId: 100,
  lastUpdateTimeFMonId: 'mySTRING',
  lastUpdateModeProtectionStatus: 100,
  lastUpdateTimeProtectionStatus: 'mySTRING',
  lastUpdateModeCheckingStatus: 100,
  lastUpdateTimeCheckingStatus: 'mySTRING',
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: 'mySTRING',
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: 'mySTRING',
  lastUpdateModeValidParamId: 100,
  lastUpdateTimeValidParamId: 'mySTRING',
  lastUpdateModeValidParamMask: 100,
  lastUpdateTimeValidParamMask: 'mySTRING',
  lastUpdateModeValidParamExpectedValue: 100,
  lastUpdateTimeValidParamExpectedValue: 'mySTRING',
  actionTcApid: 100,
  actionTcType: 100,
  actionTcSubType: 100,
  actionStatus: 100,
  actionName: 'mySTRING',
  lastUpdateModeActionStatus: 100,
  lastUpdateTimeActionStatus: 'mySTRING',
  lastUpdateModeRidStatus: 100,
  lastUpdateTimeRidStatus: 'mySTRING',
  uniqueId: 1000,
  serviceApid: 100,
  serviceApidName: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142FunctionalMonitoring) : pus142FunctionalMonitoring);
