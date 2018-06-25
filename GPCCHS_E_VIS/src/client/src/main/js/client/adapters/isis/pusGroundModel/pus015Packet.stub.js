// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus015Packet = {
  apid: 100,
  serviceType: 100,
  serviceSubType: 100,
  sid: 100,
  subsamplingRatio: 100,
  pusElement: getPusElement(),
  packetType: 100,
  sidLabel: 'mySTRING',
  isSubsamplingRatioSet: true,
  lastUpdateModePacketId: 1,
  lastUpdateTimePacketId: now,
  lastUpdateModeSubSamplingRatio: 1,
  lastUpdateTimeSubSamplingRatio: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus015Packet) : pus015Packet);
