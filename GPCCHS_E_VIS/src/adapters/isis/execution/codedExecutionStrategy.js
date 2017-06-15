// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const CODE_SIZE = 1;
const CODE_OFFSET = 0;

module.exports = {
  encode: (data) => {
    const codedExecutionStrategy = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    codedExecutionStrategy.writeUint8(data.code, CODE_OFFSET);
    return { value: codedExecutionStrategy.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'uoctet',
        name: 'code',
        size: CODE_SIZE,
        offset: CODE_OFFSET,
      },
    ],
  }),
};
