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
const uLONG = require('../ccsds_mal/uLONG');

const STATUS_SIZE = 8;
const STATUS_OFFSET = 0;
const STATUSTIME_SIZE = 8;
const STATUSTIME_OFFSET = STATUS_OFFSET + STATUS_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const lifeCycleStatus = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    uLONG.encodeRaw(data.status, lifeCycleStatus, STATUS_OFFSET + offset, STATUS_SIZE);
    tIME.encodeRaw(data.statusTime, lifeCycleStatus, STATUSTIME_OFFSET + offset, STATUSTIME_SIZE);
    return lifeCycleStatus.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const lifeCycleStatus = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    lifeCycleStatus.status = uLONG.decodeRaw(null, bufferedData, STATUS_OFFSET + offset, STATUS_SIZE);
    lifeCycleStatus.statusTime = tIME.decodeRaw(null, bufferedData, STATUSTIME_OFFSET + offset, STATUSTIME_SIZE);
    return lifeCycleStatus;
  },
};
