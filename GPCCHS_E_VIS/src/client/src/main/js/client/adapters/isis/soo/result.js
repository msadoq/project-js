// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const dURATION = require('../ccsds_mal/dURATION');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

const CONFIRMATIONSTATUS_SIZE = 8;
const CONFIRMATIONSTATUS_OFFSET = 0;
const DURATION_SIZE = 4;
const DURATION_OFFSET = CONFIRMATIONSTATUS_OFFSET + CONFIRMATIONSTATUS_SIZE;
const EXECUTIONSTATUS_SIZE = 128;
const EXECUTIONSTATUS_OFFSET = DURATION_OFFSET + DURATION_SIZE;
const DETAILEDSTATUS_SIZE = 128;
const DETAILEDSTATUS_OFFSET = EXECUTIONSTATUS_OFFSET + EXECUTIONSTATUS_SIZE;
const EXCEPTIONDETAILS_SIZE = 256;
const EXCEPTIONDETAILS_OFFSET = DETAILEDSTATUS_OFFSET + DETAILEDSTATUS_SIZE;
const STARTDATETIME_SIZE = 8;
const STARTDATETIME_OFFSET = EXCEPTIONDETAILS_OFFSET + EXCEPTIONDETAILS_SIZE;
const ENDDATETIME_SIZE = 8;
const ENDDATETIME_OFFSET = STARTDATETIME_OFFSET + STARTDATETIME_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const result = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    sTRING.encodeRaw(data.confirmationStatus, result, CONFIRMATIONSTATUS_OFFSET + offset, CONFIRMATIONSTATUS_SIZE);
    dURATION.encodeRaw(data.duration, result, DURATION_OFFSET + offset, DURATION_SIZE);
    sTRING.encodeRaw(data.executionStatus, result, EXECUTIONSTATUS_OFFSET + offset, EXECUTIONSTATUS_SIZE);
    sTRING.encodeRaw(data.detailedStatus, result, DETAILEDSTATUS_OFFSET + offset, DETAILEDSTATUS_SIZE);
    sTRING.encodeRaw(data.exceptionDetails, result, EXCEPTIONDETAILS_OFFSET + offset, EXCEPTIONDETAILS_SIZE);
    tIME.encodeRaw(data.startDatetime, result, STARTDATETIME_OFFSET + offset, STARTDATETIME_SIZE);
    tIME.encodeRaw(data.endDatetime, result, ENDDATETIME_OFFSET + offset, ENDDATETIME_SIZE);
    return result.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const result = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    result.confirmationStatus = sTRING.decodeRaw(null, bufferedData, CONFIRMATIONSTATUS_OFFSET + offset, CONFIRMATIONSTATUS_SIZE);
    result.duration = dURATION.decodeRaw(null, bufferedData, DURATION_OFFSET + offset, DURATION_SIZE);
    result.executionStatus = sTRING.decodeRaw(null, bufferedData, EXECUTIONSTATUS_OFFSET + offset, EXECUTIONSTATUS_SIZE);
    result.detailedStatus = sTRING.decodeRaw(null, bufferedData, DETAILEDSTATUS_OFFSET + offset, DETAILEDSTATUS_SIZE);
    result.exceptionDetails = sTRING.decodeRaw(null, bufferedData, EXCEPTIONDETAILS_OFFSET + offset, EXCEPTIONDETAILS_SIZE);
    result.startDatetime = tIME.decodeRaw(null, bufferedData, STARTDATETIME_OFFSET + offset, STARTDATETIME_SIZE);
    result.endDatetime = tIME.decodeRaw(null, bufferedData, ENDDATETIME_OFFSET + offset, ENDDATETIME_SIZE);
    return result;
  },
};
