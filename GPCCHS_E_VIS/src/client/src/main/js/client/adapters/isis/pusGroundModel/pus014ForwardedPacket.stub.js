// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus014ForwardedPacket = {
  apid: 100,
  forwardingStatus: true,
  pusElement: getPusElement(),
  lastUpdateModeFwdStatus: 100,
  lastUpdateTimeFwdStatus: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014ForwardedPacket) : pus014ForwardedPacket);
