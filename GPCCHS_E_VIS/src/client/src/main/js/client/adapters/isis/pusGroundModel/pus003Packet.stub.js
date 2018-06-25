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
  status: 1,
  pusElement: getPusElement(),
  sidLabel: 'mySTRING',
  isCollectionIntervalSet: true,
  lastUpdateModeSid: 1,
  lastUpdateTimeSid: now,
  lastUpdateModeStatus: 1,
  lastUpdateTimeStatus: now,
  lastUpdateModeValidParamId: 1,
  lastUpdateTimeValidParamId: now,
  lastUpdateModeValidParamMask: 1,
  lastUpdateTimeValidParamMask: now,
  lastUpdateModeValidParamExpValue: 1,
  lastUpdateTimeValidParamExpValue: now,
  lastUpdateModeCollectInterval: 1,
  lastUpdateTimeCollectInterval: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003Packet) : pus003Packet);
