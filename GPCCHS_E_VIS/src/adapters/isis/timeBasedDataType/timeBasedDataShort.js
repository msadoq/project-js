// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const fINETIME = require('../ccsds_mal/fINETIME');
const sHORT = require('../ccsds_mal/sHORT');
const sTRING = require('../ccsds_mal/sTRING');

const _MILLISEC_SIZE = 8;
const _PICOSEC_SIZE = 4;
const TIMESTAMP_SIZE = _MILLISEC_SIZE + _PICOSEC_SIZE;
const TIMESTAMP_OFFSET = 0;
const NAME_SIZE = 30;
const NAME_OFFSET = TIMESTAMP_OFFSET + TIMESTAMP_SIZE;
const VALUE_SIZE = 2;
const VALUE_OFFSET = NAME_OFFSET + NAME_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataShort = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    fINETIME.encodeRaw(data.timeStamp, timeBasedDataShort, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    sTRING.encodeRaw(data.name, timeBasedDataShort, NAME_OFFSET + offset, NAME_SIZE);
    sHORT.encodeRaw(data.value, timeBasedDataShort, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataShort.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataShort = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    timeBasedDataShort.timeStamp = fINETIME.decodeRaw(null, bufferedData, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    timeBasedDataShort.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    timeBasedDataShort.value = sHORT.decodeRaw(null, bufferedData, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataShort;
  },
};
