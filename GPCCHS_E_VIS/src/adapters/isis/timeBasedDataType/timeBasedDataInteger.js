// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const fINETIME = require('../ccsds_mal/fINETIME');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const sTRING = require('../ccsds_mal/sTRING');

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
    const timeBasedDataInteger = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    fINETIME.encodeRaw(data.timeStamp, timeBasedDataInteger, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    sTRING.encodeRaw(data.name, timeBasedDataInteger, NAME_OFFSET + offset, NAME_SIZE);
    iNTEGER.encodeRaw(data.value, timeBasedDataInteger, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataInteger.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataInteger = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    timeBasedDataInteger.timeStamp = fINETIME.decodeRaw(null, bufferedData, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    timeBasedDataInteger.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    timeBasedDataInteger.value = iNTEGER.decodeRaw(null, bufferedData, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataInteger;
  },
};
