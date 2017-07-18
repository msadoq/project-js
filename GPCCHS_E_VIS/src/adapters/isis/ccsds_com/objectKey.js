// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const lONG = require('../ccsds_mal/lONG');
const uSHORT = require('../ccsds_mal/uSHORT');

const DOMAINEID_SIZE = 2;
const DOMAINEID_OFFSET = 0;
const UID_SIZE = 8;
const UID_OFFSET = DOMAINEID_OFFSET + DOMAINEID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const objectKey = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.domaineId, objectKey, DOMAINEID_OFFSET + offset, DOMAINEID_SIZE);
    lONG.encodeRaw(data.uid, objectKey, UID_OFFSET + offset, UID_SIZE);
    return objectKey.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const objectKey = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    objectKey.domaineId = uSHORT.decodeRaw(null, bufferedData, DOMAINEID_OFFSET + offset, DOMAINEID_SIZE);
    objectKey.uid = lONG.decodeRaw(null, bufferedData, UID_OFFSET + offset, UID_SIZE);
    return objectKey;
  },
};
