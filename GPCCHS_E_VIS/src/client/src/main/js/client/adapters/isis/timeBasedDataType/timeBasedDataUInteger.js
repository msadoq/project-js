// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const fINETIME = require('../ccsds_mal/fINETIME');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');

const _MILLISEC_SIZE = 8;
const _PICOSEC_SIZE = 4;
const TIMESTAMP_SIZE = _MILLISEC_SIZE + _PICOSEC_SIZE;
const TIMESTAMP_OFFSET = 0;
const NAME_SIZE = 30;
const NAME_OFFSET = TIMESTAMP_OFFSET + TIMESTAMP_SIZE;
const VALUE_SIZE = 4;
const VALUE_OFFSET = NAME_OFFSET + NAME_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataUInteger = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    fINETIME.encodeRaw(data.timeStamp, timeBasedDataUInteger, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    sTRING.encodeRaw(data.name, timeBasedDataUInteger, NAME_OFFSET + offset, NAME_SIZE);
    uINTEGER.encodeRaw(data.value, timeBasedDataUInteger, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataUInteger.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataUInteger = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    timeBasedDataUInteger.timeStamp = fINETIME.decodeRaw(null, bufferedData, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    timeBasedDataUInteger.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    timeBasedDataUInteger.value = uINTEGER.decodeRaw(null, bufferedData, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataUInteger;
  },
};
