// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus003Packet = {
  sid: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  collectionInterval: 100,
  status: 100,
  pusElement: getPusElement(),
  sidLabel: 'mySTRING',
  isCollectionIntervalSet: true,
  lastUpdateModeSid: 100,
  lastUpdateTimeSid: now,
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: now,
  lastUpdateModeValidParamId: 100,
  lastUpdateTimeValidParamId: now,
  lastUpdateModeValidParamMask: 100,
  lastUpdateTimeValidParamMask: now,
  lastUpdateModeValidParamExpValue: 100,
  lastUpdateTimeValidParamExpValue: now,
  lastUpdateModeCollectInterval: 100,
  lastUpdateTimeCollectInterval: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003Packet) : pus003Packet);
