// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const uOCTET = require('../ccsds_mal/uOCTET');

const CODE_SIZE = 1;
const CODE_OFFSET = 0;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const codedExecutionStrategy = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uOCTET.encodeRaw(data.code, codedExecutionStrategy, CODE_OFFSET + offset, CODE_SIZE);
    return codedExecutionStrategy.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const codedExecutionStrategy = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    codedExecutionStrategy.code = uOCTET.decodeRaw(null, bufferedData, CODE_OFFSET + offset, CODE_SIZE);
    return codedExecutionStrategy;
  },
};
