// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const uSHORT = require('../ccsds_mal/uSHORT');

const APID_SIZE = 2;
const APID_OFFSET = 0;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const apid = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.apid, apid, APID_OFFSET + offset, APID_SIZE);
    return apid.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const apid = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    apid.apid = uSHORT.decodeRaw(null, bufferedData, APID_OFFSET + offset, APID_SIZE);
    return apid;
  },
};
