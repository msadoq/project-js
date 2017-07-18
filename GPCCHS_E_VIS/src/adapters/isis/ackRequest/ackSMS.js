// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const tIME = require('../ccsds_mal/tIME');

const SYSTEMCREATIONDATE_SIZE = 8;
const SYSTEMCREATIONDATE_OFFSET = 0;
const APPLICATIONCREATIONDATE_SIZE = 8;
const APPLICATIONCREATIONDATE_OFFSET = SYSTEMCREATIONDATE_OFFSET + SYSTEMCREATIONDATE_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const ackSMS = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    tIME.encodeRaw(data.systemCreationDate, ackSMS, SYSTEMCREATIONDATE_OFFSET + offset, SYSTEMCREATIONDATE_SIZE);
    tIME.encodeRaw(data.applicationCreationDate, ackSMS, APPLICATIONCREATIONDATE_OFFSET + offset, APPLICATIONCREATIONDATE_SIZE);
    return ackSMS.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const ackSMS = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    ackSMS.systemCreationDate = tIME.decodeRaw(null, bufferedData, SYSTEMCREATIONDATE_OFFSET + offset, SYSTEMCREATIONDATE_SIZE);
    ackSMS.applicationCreationDate = tIME.decodeRaw(null, bufferedData, APPLICATIONCREATIONDATE_OFFSET + offset, APPLICATIONCREATIONDATE_SIZE);
    return ackSMS;
  },
};
