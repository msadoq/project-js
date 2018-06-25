// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus003Packet = require('./pus003Packet.stub');

const now = _now();

const pus003HkPacket = {
  generationMode: 1,
  pus003Packet: getPus003Packet(),
  lastUpdateTimeGenMode: now,
  lastUpdateModeGenMode: 1,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003HkPacket) : pus003HkPacket);
