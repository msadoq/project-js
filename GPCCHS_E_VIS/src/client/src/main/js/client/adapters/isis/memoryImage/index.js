// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const Location = require('./location');
const MAPData = require('./mAPData');
const MemoryImage = require('./memoryImage');
const MAP = require('./mAP');
const BinaryData = require('./binaryData');

module.exports = {
  Location: { type: 'protobuf', adapter: Location },
  MAPData: { type: 'protobuf', adapter: MAPData },
  MemoryImage: { type: 'protobuf', adapter: MemoryImage },
  MAP: { type: 'protobuf', adapter: MAP },
  BinaryData: { type: 'protobuf', adapter: BinaryData },
};
