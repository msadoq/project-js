// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const dURATION = require('../ccsds_mal/dURATION');
const tIME = require('../ccsds_mal/tIME');

const COLLECTIONINTERVAL_SIZE = 4;
const COLLECTIONINTERVAL_OFFSET = 0;
const REPORTINGINTERVAL_SIZE = 4;
const REPORTINGINTERVAL_OFFSET = COLLECTIONINTERVAL_OFFSET + COLLECTIONINTERVAL_SIZE;
const SAMPLINGINTERVAL_SIZE = 4;
const SAMPLINGINTERVAL_OFFSET = REPORTINGINTERVAL_OFFSET + REPORTINGINTERVAL_SIZE;
const REPORTINGENABLED_SIZE = 1;
const REPORTINGENABLED_OFFSET = SAMPLINGINTERVAL_OFFSET + SAMPLINGINTERVAL_SIZE;
const STARTTIME_SIZE = 8;
const STARTTIME_OFFSET = REPORTINGENABLED_OFFSET + REPORTINGENABLED_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const statisticLinkStruct = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    dURATION.encodeRaw(data.collectionInterval, statisticLinkStruct, COLLECTIONINTERVAL_OFFSET + offset, COLLECTIONINTERVAL_SIZE);
    dURATION.encodeRaw(data.reportingInterval, statisticLinkStruct, REPORTINGINTERVAL_OFFSET + offset, REPORTINGINTERVAL_SIZE);
    dURATION.encodeRaw(data.samplingInterval, statisticLinkStruct, SAMPLINGINTERVAL_OFFSET + offset, SAMPLINGINTERVAL_SIZE);
    bOOLEAN.encodeRaw(data.reportingEnabled, statisticLinkStruct, REPORTINGENABLED_OFFSET + offset, REPORTINGENABLED_SIZE);
    tIME.encodeRaw(data.startTime, statisticLinkStruct, STARTTIME_OFFSET + offset, STARTTIME_SIZE);
    return statisticLinkStruct.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const statisticLinkStruct = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    statisticLinkStruct.collectionInterval = dURATION.decodeRaw(null, bufferedData, COLLECTIONINTERVAL_OFFSET + offset, COLLECTIONINTERVAL_SIZE);
    statisticLinkStruct.reportingInterval = dURATION.decodeRaw(null, bufferedData, REPORTINGINTERVAL_OFFSET + offset, REPORTINGINTERVAL_SIZE);
    statisticLinkStruct.samplingInterval = dURATION.decodeRaw(null, bufferedData, SAMPLINGINTERVAL_OFFSET + offset, SAMPLINGINTERVAL_SIZE);
    statisticLinkStruct.reportingEnabled = bOOLEAN.decodeRaw(null, bufferedData, REPORTINGENABLED_OFFSET + offset, REPORTINGENABLED_SIZE);
    statisticLinkStruct.startTime = tIME.decodeRaw(null, bufferedData, STARTTIME_OFFSET + offset, STARTTIME_SIZE);
    return statisticLinkStruct;
  },
};
