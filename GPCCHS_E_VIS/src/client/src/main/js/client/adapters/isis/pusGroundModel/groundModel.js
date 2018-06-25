// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const uSHORT = require('../ccsds_mal/uSHORT');

const APID_SIZE = 2;
const APID_OFFSET = 0;
const PUSSERVICETYPE_SIZE = 2;
const PUSSERVICETYPE_OFFSET = APID_OFFSET + APID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const groundModel = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.apid, groundModel, APID_OFFSET + offset, APID_SIZE);
    uSHORT.encodeRaw(data.pusServiceType, groundModel, PUSSERVICETYPE_OFFSET + offset, PUSSERVICETYPE_SIZE);
    return groundModel.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const groundModel = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    groundModel.apid = uSHORT.decodeRaw(null, bufferedData, APID_OFFSET + offset, APID_SIZE);
    groundModel.pusServiceType = uSHORT.decodeRaw(null, bufferedData, PUSSERVICETYPE_OFFSET + offset, PUSSERVICETYPE_SIZE);
    return groundModel;
  },
};
