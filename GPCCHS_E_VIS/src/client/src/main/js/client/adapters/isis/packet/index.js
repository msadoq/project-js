// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const TmPacket = require('./tmPacket');
const RmPacket = require('./rmPacket');
const ClcwPacket = require('./clcwPacket');
const Packet = require('./packet');

module.exports = {
  TmPacket: { type: 'protobuf', adapter: TmPacket },
  RmPacket: { type: 'protobuf', adapter: RmPacket },
  ClcwPacket: { type: 'protobuf', adapter: ClcwPacket },
  Packet: { type: 'protobuf', adapter: Packet },
};
