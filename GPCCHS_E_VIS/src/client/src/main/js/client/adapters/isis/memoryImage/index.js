// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const BinaryData = require('./binaryData');
const Location = require('./location');
const MemoryImage = require('./memoryImage');
const MAP = require('./mAP');
const MAPData = require('./mAPData');

module.exports = {
  BinaryData: { type: 'protobuf', adapter: BinaryData },
  Location: { type: 'protobuf', adapter: Location },
  MemoryImage: { type: 'protobuf', adapter: MemoryImage },
  MAP: { type: 'protobuf', adapter: MAP },
  MAPData: { type: 'protobuf', adapter: MAPData },
};
