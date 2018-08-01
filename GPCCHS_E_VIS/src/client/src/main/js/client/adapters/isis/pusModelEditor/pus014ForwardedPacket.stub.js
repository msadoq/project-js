// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus014ForwardedPacket = {
  packetApid: 100,
  forwardingStatusTypeSubtype: 100,
  lastUpdateModeFwdStatusTypeSubtype: 100,
  lastUpdateTimeFwdStatusTypeSubtype: 'mySTRING',
  packetApidName: 'mySTRING',
  serviceApid: 100,
  packetName: 'mySTRING',
  serviceApidName: 'mySTRING',
  rid: 100,
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: 'mySTRING',
  ridLabel: 'mySTRING',
  sid: 100,
  lastUpdateModeSid: 100,
  lastUpdateTimeSid: 'mySTRING',
  subsamplingRatio: 100,
  lastUpdateModeSubSamplingRatio: 100,
  lastUpdateTimeSubSamplingRatio: 'mySTRING',
  sidLabel: 'mySTRING',
  serviceType: 100,
  serviceSubType: 100,
  lastUpdateModeTypeSubType: 100,
  lastUpdateTimeTypeSubType: 'mySTRING',
  uniqueId: 1000,
  status: 100,
  packetType: 'mySTRING',
  forwardingStatusRidSid: 100,
  lastUpdateModeFwdStatusTypeRidSid: 100,
  lastUpdateTimeFwdStatusTypeRidSid: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014ForwardedPacket) : pus014ForwardedPacket);
