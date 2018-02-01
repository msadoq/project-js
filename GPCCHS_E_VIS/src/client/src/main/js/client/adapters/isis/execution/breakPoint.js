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

const POSITION_SIZE = 1;
const POSITION_OFFSET = 0;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const breakPoint = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uOCTET.encodeRaw(data.position, breakPoint, POSITION_OFFSET + offset, POSITION_SIZE);
    return breakPoint.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const breakPoint = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    breakPoint.position = uOCTET.decodeRaw(null, bufferedData, POSITION_OFFSET + offset, POSITION_SIZE);
    return breakPoint;
  },
};
