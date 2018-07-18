// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const operationStatus = require('./operationStatus');
const tIME = require('../ccsds_mal/tIME');

const OPERATIONSTATUS_SIZE = 4;
const OPERATIONSTATUS_OFFSET = 0;
const OCCURENCEDATE_SIZE = 8;
const OCCURENCEDATE_OFFSET = OPERATIONSTATUS_OFFSET + OPERATIONSTATUS_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const status = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    tIME.encodeRaw(data.occurenceDate, status, OCCURENCEDATE_OFFSET + offset, OCCURENCEDATE_SIZE);
    return status.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const status = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    status.occurenceDate = tIME.decodeRaw(null, bufferedData, OCCURENCEDATE_OFFSET + offset, OCCURENCEDATE_SIZE);
    return status;
  },
};
