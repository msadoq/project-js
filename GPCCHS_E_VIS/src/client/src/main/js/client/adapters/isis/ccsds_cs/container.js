// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const tIME = require('../ccsds_mal/tIME');
const uSHORT = require('../ccsds_mal/uSHORT');

const SLOTID_SIZE = 2;
const SLOTID_OFFSET = 0;
const CONTAINERTIME_SIZE = 8;
const CONTAINERTIME_OFFSET = SLOTID_OFFSET + SLOTID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const container = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.slotId, container, SLOTID_OFFSET + offset, SLOTID_SIZE);
    tIME.encodeRaw(data.containerTime, container, CONTAINERTIME_OFFSET + offset, CONTAINERTIME_SIZE);
    return container.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const container = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    container.slotId = uSHORT.decodeRaw(null, bufferedData, SLOTID_OFFSET + offset, SLOTID_SIZE);
    container.containerTime = tIME.decodeRaw(null, bufferedData, CONTAINERTIME_OFFSET + offset, CONTAINERTIME_SIZE);
    return container;
  },
};
