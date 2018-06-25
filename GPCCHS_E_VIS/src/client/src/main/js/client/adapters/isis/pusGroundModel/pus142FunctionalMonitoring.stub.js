// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus142ParameterMonitoringDefinition = require('./pus142ParameterMonitoringDefinition.stub');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus142FunctionalMonitoring = {
  fmonId: 100,
  protectionStatus: 'mySTRING',
  status: 1,
  checkingStatus: 'mySTRING',
  rid: 100,
  pus142ParameterMonitoringDefinition: [getPus142ParameterMonitoringDefinition(), getPus142ParameterMonitoringDefinition()],
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  pusElement: getPusElement(),
  ridLabel: 'mySTRING',
  fmonIdLabel: 'mySTRING',
  lastUpdateModeFMonId: 1,
  lastUpdateTimeFMonId: now,
  lastUpdateModeProtectionStatus: 1,
  lastUpdateTimeProtectionStatus: now,
  lastUpdateModeCheckingStatus: 1,
  lastUpdateTimeCheckingStatus: now,
  lastUpdateModeStatus: 1,
  lastUpdateTimeStatus: now,
  lastUpdateModeRid: 1,
  lastUpdateTimeRid: now,
  lastUpdateModeValidParamId: 1,
  lastUpdateTimeValidParamId: now,
  lastUpdateModeValidParamMask: 1,
  lastUpdateTimeValidParamMask: now,
  lastUpdateModeValidParamExpectedValue: 1,
  lastUpdateTimeValidParamExpectedValue: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142FunctionalMonitoring) : pus142FunctionalMonitoring);
