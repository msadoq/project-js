// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const iNTEGER = require('../ccsds_mal/iNTEGER');
const tIME = require('../ccsds_mal/tIME');

const CMDID_SIZE = 4;
const CMDID_OFFSET = 0;
const INTPARAMETER_SIZE = 4;
const INTPARAMETER_OFFSET = CMDID_OFFSET + CMDID_SIZE;
const DATE_SIZE = 8;
const DATE_OFFSET = INTPARAMETER_OFFSET + INTPARAMETER_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const timeStructure = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    iNTEGER.encodeRaw(data.cmdId, timeStructure, CMDID_OFFSET + offset, CMDID_SIZE);
    iNTEGER.encodeRaw(data.intParameter, timeStructure, INTPARAMETER_OFFSET + offset, INTPARAMETER_SIZE);
    tIME.encodeRaw(data.date, timeStructure, DATE_OFFSET + offset, DATE_SIZE);
    return timeStructure.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const timeStructure = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    timeStructure.cmdId = iNTEGER.decodeRaw(null, bufferedData, CMDID_OFFSET + offset, CMDID_SIZE);
    timeStructure.intParameter = iNTEGER.decodeRaw(null, bufferedData, INTPARAMETER_OFFSET + offset, INTPARAMETER_SIZE);
    timeStructure.date = tIME.decodeRaw(null, bufferedData, DATE_OFFSET + offset, DATE_SIZE);
    return timeStructure;
  },
};
