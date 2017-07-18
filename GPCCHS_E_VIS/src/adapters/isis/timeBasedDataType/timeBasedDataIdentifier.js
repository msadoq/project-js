// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const fINETIME = require('../ccsds_mal/fINETIME');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const sTRING = require('../ccsds_mal/sTRING');

const _MILLISEC_SIZE = 8;
const _PICOSEC_SIZE = 4;
const TIMESTAMP_SIZE = _MILLISEC_SIZE + _PICOSEC_SIZE;
const TIMESTAMP_OFFSET = 0;
const NAME_SIZE = 30;
const NAME_OFFSET = TIMESTAMP_OFFSET + TIMESTAMP_SIZE;
const VALUE_SIZE = 50;
const VALUE_OFFSET = NAME_OFFSET + NAME_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataIdentifier = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    fINETIME.encodeRaw(data.timeStamp, timeBasedDataIdentifier, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    sTRING.encodeRaw(data.name, timeBasedDataIdentifier, NAME_OFFSET + offset, NAME_SIZE);
    iDENTIFIER.encodeRaw(data.value, timeBasedDataIdentifier, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataIdentifier.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const timeBasedDataIdentifier = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    timeBasedDataIdentifier.timeStamp = fINETIME.decodeRaw(null, bufferedData, TIMESTAMP_OFFSET + offset, TIMESTAMP_SIZE);
    timeBasedDataIdentifier.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    timeBasedDataIdentifier.value = iDENTIFIER.decodeRaw(null, bufferedData, VALUE_OFFSET + offset, VALUE_SIZE);
    return timeBasedDataIdentifier;
  },
};
