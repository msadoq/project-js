// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const activityRequest = require('./activityRequest');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

const NAME_SIZE = 64;
const NAME_OFFSET = 0;
const ACTIVITY_SIZE = 4;
const ACTIVITY_OFFSET = NAME_OFFSET + NAME_SIZE;
const CREATIONDATE_SIZE = 8;
const CREATIONDATE_OFFSET = ACTIVITY_OFFSET + ACTIVITY_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const functionalChain = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    sTRING.encodeRaw(data.name, functionalChain, NAME_OFFSET + offset, NAME_SIZE);
    tIME.encodeRaw(data.creationDate, functionalChain, CREATIONDATE_OFFSET + offset, CREATIONDATE_SIZE);
    return functionalChain.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const functionalChain = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    functionalChain.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    functionalChain.creationDate = tIME.decodeRaw(null, bufferedData, CREATIONDATE_OFFSET + offset, CREATIONDATE_SIZE);
    return functionalChain;
  },
};
