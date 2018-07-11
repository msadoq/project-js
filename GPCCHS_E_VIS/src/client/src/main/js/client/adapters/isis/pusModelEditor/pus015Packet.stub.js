// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const pus015Packet = {
  packetApid: 100,
  serviceType: 100,
  serviceSubType: 100,
  sid: 100,
  subsamplingRatio: 100,
  packetType: 100,
  sidLabel: 'mySTRING',
  isSubsamplingRatioSet: true,
  lastUpdateModePacketId: 100,
  lastUpdateTimePacketId: 'mySTRING',
  lastUpdateModeSubSamplingRatio: 100,
  lastUpdateTimeSubSamplingRatio: 'mySTRING',
  serviceApid: 100,
  serviceApidName: 'mySTRING',
  packetApidName: 'mySTRING',
  sidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015Packet) : pus015Packet);
