// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket.stub');

const now = _now();

const pus014TmPacket = {
  serviceTpe: 100,
  serviceSubType: 100,
  pus014ForwardedPacket: getPus014ForwardedPacket(),
  lastUpdateModeTypeSubType: 1,
  lastUpdateTimeTypeSubType: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014TmPacket) : pus014TmPacket);
