// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusMmePacket = require('./pusMmePacket.stub');

const pusMmeModel = {
  serviceApid: 100,
  status: 100,
  serviceApidName: 'mySTRING',
  uniqueId: 1000,
  pusMmePacket: [getPusMmePacket(), getPusMmePacket()],
  noHkPackets: 100,
  noDiagPackets: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pusMmeModel) : pusMmeModel);
