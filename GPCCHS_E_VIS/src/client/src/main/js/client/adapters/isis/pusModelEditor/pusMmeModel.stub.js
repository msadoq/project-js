// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusMmePacket = require('./pusMmePacket.stub');

const now = _now();

const pusMmeModel = {
  serviceApid: 100,
  status: 100,
  groundDate: now,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
  pusMmePacket: [getPusMmePacket(), getPusMmePacket()],
};

module.exports = override => (override ? _defaultsDeep({}, override, pusMmeModel) : pusMmeModel);
