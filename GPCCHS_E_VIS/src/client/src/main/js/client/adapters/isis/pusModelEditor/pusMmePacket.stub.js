// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusMmePacketParameter = require('./pusMmePacketParameter.stub');
const getPusMmePacketStore = require('./pusMmePacketStore.stub');

const pusMmePacket = {
  sid: 100,
  validityParameterId: 100,
  validityParameterMask: 'mySTRING',
  validityParameterExpectedValue: 'mySTRING',
  collectionInterval: 'mySTRING',
  status: 100,
  sidLabel: 'mySTRING',
  lastUpdateModeSid: 100,
  lastUpdateTimeSid: 'mySTRING',
  lastUpdateModeStatus: 100,
  lastUpdateTimeStatus: 'mySTRING',
  lastUpdateModeValidParamId: 100,
  lastUpdateTimeValidParamId: 'mySTRING',
  lastUpdateModeValidParamMask: 100,
  lastUpdateTimeValidParamMask: 'mySTRING',
  lastUpdateModeValidParamExpValue: 100,
  lastUpdateTimeValidParamExpValue: 'mySTRING',
  lastUpdateModeCollectInterval: 100,
  lastUpdateTimeCollectInterval: 'mySTRING',
  packetName: 'mySTRING',
  validityParameterName: 'mySTRING',
  packetApid: 100,
  packetApidName: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
  generationMode: 'mySTRING',
  lastUpdateTimeGenMode: 'mySTRING',
  lastUpdateModeGenMode: 100,
  packetType: 'mySTRING',
  forwardingStatusTypeSubtype: 100,
  lastUpdateModeFwdStatusTypeSubtype: 100,
  lastUpdateTimeFwdStatusTypeSubtype: 'mySTRING',
  forwardingStatusRidSid: 100,
  lastUpdateModeFwdStatusTypeRidSid: 100,
  lastUpdateTimeFwdStatusTypeRidSid: 'mySTRING',
  lastUpdateModeSubSamplingRatio: 100,
  lastUpdateTimeSubSamplingRatio: 'mySTRING',
  subsamplingRatio: 100,
  pusMmePacketStore: [getPusMmePacketStore(), getPusMmePacketStore()],
  pusMmePacketParameter: [getPusMmePacketParameter(), getPusMmePacketParameter()],
};

module.exports = override => (override ? _defaultsDeep({}, override, pusMmePacket) : pusMmePacket);
