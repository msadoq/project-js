// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

const AREA_SIZE = 2;
const AREA_OFFSET = 0;
const SERVICE_SIZE = 2;
const SERVICE_OFFSET = AREA_OFFSET + AREA_SIZE;
const VERSION_SIZE = 1;
const VERSION_OFFSET = SERVICE_OFFSET + SERVICE_SIZE;
const NUMBER_SIZE = 2;
const NUMBER_OFFSET = VERSION_OFFSET + VERSION_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const objectType = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uSHORT.encodeRaw(data.area, objectType, AREA_OFFSET + offset, AREA_SIZE);
    uSHORT.encodeRaw(data.service, objectType, SERVICE_OFFSET + offset, SERVICE_SIZE);
    uOCTET.encodeRaw(data.version, objectType, VERSION_OFFSET + offset, VERSION_SIZE);
    uSHORT.encodeRaw(data.number, objectType, NUMBER_OFFSET + offset, NUMBER_SIZE);
    return objectType.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const objectType = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    objectType.area = uSHORT.decodeRaw(null, bufferedData, AREA_OFFSET + offset, AREA_SIZE);
    objectType.service = uSHORT.decodeRaw(null, bufferedData, SERVICE_OFFSET + offset, SERVICE_SIZE);
    objectType.version = uOCTET.decodeRaw(null, bufferedData, VERSION_OFFSET + offset, VERSION_SIZE);
    objectType.number = uSHORT.decodeRaw(null, bufferedData, NUMBER_OFFSET + offset, NUMBER_SIZE);
    return objectType;
  },
};
