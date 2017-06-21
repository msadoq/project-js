// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Packet = require('./packet');
const TmPacket = require('./tmPacket');
const ClcwPacket = require('./clcwPacket');
const RmPacket = require('./rmPacket');

module.exports = {
  Packet: { type: 'protobuf', adapter: Packet },
  TmPacket: { type: 'protobuf', adapter: TmPacket },
  ClcwPacket: { type: 'protobuf', adapter: ClcwPacket },
  RmPacket: { type: 'protobuf', adapter: RmPacket },
};
