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
  lastUpdateModeRid: 100,
  lastUpdateTimeRid: 'mySTRING',
  rid: 100,
  ridLabel: 'mySTRING',
  lastUpdateModeSid: 100,
  lastUpdateTimeSid: 'mySTRING',
  lastUpdateModeSubSamplingRatio: 100,
  lastUpdateTimeSubSamplingRatio: 'mySTRING',
  subsamplingRatio: 100,
  sid: 100,
  sidLabel: 'mySTRING',
  lastUpdateModeTypeSubType: 100,
  lastUpdateTimeTypeSubType: 'mySTRING',
  serviceType: 100,
  serviceSubType: 100,
  uniqueId: 1000,
  status: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014ForwardedPacket) : pus014ForwardedPacket);
