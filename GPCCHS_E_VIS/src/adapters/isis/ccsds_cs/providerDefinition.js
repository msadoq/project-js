// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const PROVIDERDEFINITIONNAME_SIZE = 32;
const PROVIDERDEFINITIONNAME_OFFSET = 0;
const PROVIDERDEFINITIONTIME_SIZE = 8;
const PROVIDERDEFINITIONTIME_OFFSET = PROVIDERDEFINITIONNAME_OFFSET + PROVIDERDEFINITIONNAME_SIZE;

module.exports = {
  encode: (data) => {
    const providerDefinition = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    providerDefinition.writeString(data.providerDefinitionName + '\0'.repeat(PROVIDERDEFINITIONNAME_SIZE - data.providerDefinitionName.length), PROVIDERDEFINITIONNAME_OFFSET);
    providerDefinition.writeUint64(data.providerDefinitionTime, PROVIDERDEFINITIONTIME_OFFSET);
    return { value: providerDefinition.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'identifier',
        name: 'providerDefinitionName',
        size: PROVIDERDEFINITIONNAME_SIZE,
        offset: PROVIDERDEFINITIONNAME_OFFSET,
      },
      {
        type: 'time',
        name: 'providerDefinitionTime',
        size: PROVIDERDEFINITIONTIME_SIZE,
        offset: PROVIDERDEFINITIONTIME_OFFSET,
      },
    ],
  }),
};
