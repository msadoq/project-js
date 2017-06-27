// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const tIME = require('../ccsds_mal/tIME');

const STATUS_SIZE = 4;
const STATUS_OFFSET = 0;
const STATUSTIME_SIZE = 8;
const STATUSTIME_OFFSET = STATUS_OFFSET + STATUS_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const executionStatus = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    iNTEGER.encodeRaw(data.status, executionStatus, STATUS_OFFSET + offset, STATUS_SIZE);
    tIME.encodeRaw(data.statusTime, executionStatus, STATUSTIME_OFFSET + offset, STATUSTIME_SIZE);
    return executionStatus.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const executionStatus = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    executionStatus.status = iNTEGER.decodeRaw(null, bufferedData, STATUS_OFFSET + offset, STATUS_SIZE);
    executionStatus.statusTime = tIME.decodeRaw(null, bufferedData, STATUSTIME_OFFSET + offset, STATUSTIME_SIZE);
    return executionStatus;
  },
};
