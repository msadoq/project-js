// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ClcwPacket = require('./clcwPacket');
const TmPacket = require('./tmPacket');
const RmPacket = require('./rmPacket');
const Packet = require('./packet');

module.exports = {
  ClcwPacket: { type: 'protobuf', adapter: ClcwPacket },
  TmPacket: { type: 'protobuf', adapter: TmPacket },
  RmPacket: { type: 'protobuf', adapter: RmPacket },
  Packet: { type: 'protobuf', adapter: Packet },
};
