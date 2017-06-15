// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const SLOTID_SIZE = 2;
const SLOTID_OFFSET = 0;
const CONTAINERTIME_SIZE = 8;
const CONTAINERTIME_OFFSET = SLOTID_OFFSET + SLOTID_SIZE;

module.exports = {
  encode: (data) => {
    const container = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    container.writeUint16(data.slotId, SLOTID_OFFSET);
    container.writeUint64(data.containerTime, CONTAINERTIME_OFFSET);
    return { value: container.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'ushort',
        name: 'slotId',
        size: SLOTID_SIZE,
        offset: SLOTID_OFFSET,
      },
      {
        type: 'time',
        name: 'containerTime',
        size: CONTAINERTIME_SIZE,
        offset: CONTAINERTIME_OFFSET,
      },
    ],
  }),
};
