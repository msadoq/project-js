// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const tIME = require('../ccsds_mal/tIME');

const PROVIDERDEFINITIONNAME_SIZE = 32;
const PROVIDERDEFINITIONNAME_OFFSET = 0;
const PROVIDERDEFINITIONTIME_SIZE = 8;
const PROVIDERDEFINITIONTIME_OFFSET = PROVIDERDEFINITIONNAME_OFFSET + PROVIDERDEFINITIONNAME_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const providerDefinition = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    iDENTIFIER.encodeRaw(data.providerDefinitionName, providerDefinition, PROVIDERDEFINITIONNAME_OFFSET + offset, PROVIDERDEFINITIONNAME_SIZE);
    tIME.encodeRaw(data.providerDefinitionTime, providerDefinition, PROVIDERDEFINITIONTIME_OFFSET + offset, PROVIDERDEFINITIONTIME_SIZE);
    return providerDefinition.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const providerDefinition = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    providerDefinition.providerDefinitionName = iDENTIFIER.decodeRaw(null, bufferedData, PROVIDERDEFINITIONNAME_OFFSET + offset, PROVIDERDEFINITIONNAME_SIZE);
    providerDefinition.providerDefinitionTime = tIME.decodeRaw(null, bufferedData, PROVIDERDEFINITIONTIME_OFFSET + offset, PROVIDERDEFINITIONTIME_SIZE);
    return providerDefinition;
  },
};
