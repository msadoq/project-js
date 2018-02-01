// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus003Packet = require('./pus003Packet.stub');

const pus003HkPacket = {
  generationMode: 100,
  pus003Packet: getPus003Packet(),
};

module.exports = override => (override ? _defaultsDeep({}, override, pus003HkPacket) : pus003HkPacket);
