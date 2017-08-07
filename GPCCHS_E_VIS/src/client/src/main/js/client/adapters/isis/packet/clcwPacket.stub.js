// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const clcwPacket = {
  groundDate: now,
  onboardDate: now,
  apid: 10,
  service: 1,
  subService: 1,
  destinationId: 1,
  isDecommuted: true,
  primaryHeaderSize: 1,
  secondaryHeaderSize: 1,
  isNominal: true,
  rawData: Buffer.alloc(4, 1),
};

module.exports = override => (override ? _defaultsDeep({}, override, clcwPacket) : clcwPacket);
