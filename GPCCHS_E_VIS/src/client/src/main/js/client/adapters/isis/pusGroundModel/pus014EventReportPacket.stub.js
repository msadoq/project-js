// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket.stub');

const now = _now();

const pus014EventReportPacket = {
  rid: 100,
  pus014ForwardedPacket: getPus014ForwardedPacket(),
  ridLabel: 'mySTRING',
  lastUpdateModeRid: 1,
  lastUpdateTimeRid: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014EventReportPacket) : pus014EventReportPacket);
