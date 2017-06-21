// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus003Packet = require('./pus003Packet.stub');

const pus003DiagnosticPacket = {
  pus003Packet: getPus003Packet(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003DiagnosticPacket) : pus003DiagnosticPacket);
