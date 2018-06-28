// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const TmPacket = require('./tmPacket');
const Packet = require('./packet');
const ClcwPacket = require('./clcwPacket');
const RmPacket = require('./rmPacket');

module.exports = {
  TmPacket: { type: 'protobuf', adapter: TmPacket },
  Packet: { type: 'protobuf', adapter: Packet },
  ClcwPacket: { type: 'protobuf', adapter: ClcwPacket },
  RmPacket: { type: 'protobuf', adapter: RmPacket },
};
