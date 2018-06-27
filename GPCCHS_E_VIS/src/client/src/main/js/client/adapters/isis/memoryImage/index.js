// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const MAPData = require('./mAPData');
const MemoryImage = require('./memoryImage');
const BinaryData = require('./binaryData');
const Location = require('./location');
const MAP = require('./mAP');

module.exports = {
  MAPData: { type: 'protobuf', adapter: MAPData },
  MemoryImage: { type: 'protobuf', adapter: MemoryImage },
  BinaryData: { type: 'protobuf', adapter: BinaryData },
  Location: { type: 'protobuf', adapter: Location },
  MAP: { type: 'protobuf', adapter: MAP },
};
