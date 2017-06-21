// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const MemoryImage = require('./memoryImage');
const Location = require('./location');
const MAP = require('./mAP');
const MAPData = require('./mAPData');
const BinaryData = require('./binaryData');

module.exports = {
  MemoryImage: { type: 'protobuf', adapter: MemoryImage },
  Location: { type: 'protobuf', adapter: Location },
  MAP: { type: 'protobuf', adapter: MAP },
  MAPData: { type: 'protobuf', adapter: MAPData },
  BinaryData: { type: 'protobuf', adapter: BinaryData },
};
