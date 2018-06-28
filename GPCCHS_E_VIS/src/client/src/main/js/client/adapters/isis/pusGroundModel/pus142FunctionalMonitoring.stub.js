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
  status: 100,
  checkingStatus: 'mySTRING',
  rid: 100,
  pus142ParameterMonitoringDefinition: [getPus142ParameterMonitoringDefinition(), getPus142ParameterMonitoringDefinition()],
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  pusElement: getPusElement(),
  ridLabel: 'mySTRING',
  fmonIdLabel: 'mySTRING',
  lastUpdateModeFMonId: 100,
  lastUpdateTimeFMonId: now,
  lastUpdateModeProtectionStatus: 100,
  lastUpdateTimeProtectionStatus: now,
  lastUpdateModeCheckingStatus: 100,
  lastUpdateTimeCheckingStatus: now,
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: now,
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: now,
  lastUpdateModeValidParamId: 100,
  lastUpdateTimeValidParamId: now,
  lastUpdateModeValidParamMask: 100,
  lastUpdateTimeValidParamMask: now,
  lastUpdateModeValidParamExpectedValue: 100,
  lastUpdateTimeValidParamExpectedValue: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus142FunctionalMonitoring) : pus142FunctionalMonitoring);
