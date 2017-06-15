// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const POSITION_SIZE = 1;
const POSITION_OFFSET = 0;

module.exports = {
  encode: (data) => {
    const breakPoint = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    breakPoint.writeUint8(data.position, POSITION_OFFSET);
    return { value: breakPoint.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'uoctet',
        name: 'position',
        size: POSITION_SIZE,
        offset: POSITION_OFFSET,
      },
    ],
  }),
};
