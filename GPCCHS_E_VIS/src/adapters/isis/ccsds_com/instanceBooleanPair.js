// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const lONG = require('../ccsds_mal/lONG');

const ID_SIZE = 8;
const ID_OFFSET = 0;
const VALUE_SIZE = 1;
const VALUE_OFFSET = ID_OFFSET + ID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const instanceBooleanPair = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    lONG.encodeRaw(data.id, instanceBooleanPair, ID_OFFSET + offset, ID_SIZE);
    bOOLEAN.encodeRaw(data.value, instanceBooleanPair, VALUE_OFFSET + offset, VALUE_SIZE);
    return instanceBooleanPair.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const instanceBooleanPair = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    instanceBooleanPair.id = lONG.decodeRaw(null, bufferedData, ID_OFFSET + offset, ID_SIZE);
    instanceBooleanPair.value = bOOLEAN.decodeRaw(null, bufferedData, VALUE_OFFSET + offset, VALUE_SIZE);
    return instanceBooleanPair;
  },
};
