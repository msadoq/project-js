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
    const statisticLink = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    dURATION.encodeRaw(data.collectionInterval, statisticLink, COLLECTIONINTERVAL_OFFSET + offset, COLLECTIONINTERVAL_SIZE);
    dURATION.encodeRaw(data.reportingInterval, statisticLink, REPORTINGINTERVAL_OFFSET + offset, REPORTINGINTERVAL_SIZE);
    dURATION.encodeRaw(data.samplingInterval, statisticLink, SAMPLINGINTERVAL_OFFSET + offset, SAMPLINGINTERVAL_SIZE);
    bOOLEAN.encodeRaw(data.reportingEnabled, statisticLink, REPORTINGENABLED_OFFSET + offset, REPORTINGENABLED_SIZE);
    tIME.encodeRaw(data.startTime, statisticLink, STARTTIME_OFFSET + offset, STARTTIME_SIZE);
    return statisticLink.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const statisticLink = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    statisticLink.collectionInterval = dURATION.decodeRaw(null, bufferedData, COLLECTIONINTERVAL_OFFSET + offset, COLLECTIONINTERVAL_SIZE);
    statisticLink.reportingInterval = dURATION.decodeRaw(null, bufferedData, REPORTINGINTERVAL_OFFSET + offset, REPORTINGINTERVAL_SIZE);
    statisticLink.samplingInterval = dURATION.decodeRaw(null, bufferedData, SAMPLINGINTERVAL_OFFSET + offset, SAMPLINGINTERVAL_SIZE);
    statisticLink.reportingEnabled = bOOLEAN.decodeRaw(null, bufferedData, REPORTINGENABLED_OFFSET + offset, REPORTINGENABLED_SIZE);
    statisticLink.startTime = tIME.decodeRaw(null, bufferedData, STARTTIME_OFFSET + offset, STARTTIME_SIZE);
    return statisticLink;
  },
};
