// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket.stub');

const now = _now();

const pus014Model = {
  pus014TmPacket: [getPus014ForwardedPacket(), getPus014ForwardedPacket()],
  groundDate: now,
  serviceApid: 100,
  status: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014Model) : pus014Model);
