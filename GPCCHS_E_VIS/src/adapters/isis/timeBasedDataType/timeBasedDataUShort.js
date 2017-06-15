// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const MILLISEC_SIZE = 8;
const PICOSEC_SIZE = 4;
const TIMESTAMP_SIZE = MILLISEC_SIZE + PICOSEC_SIZE;
const TIMESTAMP_OFFSET = 0;
const NAME_SIZE = 30;
const NAME_OFFSET = TIMESTAMP_OFFSET + TIMESTAMP_SIZE; 
const VALUE_SIZE = 2;
const VALUE_OFFSET = NAME_OFFSET + NAME_SIZE;

module.exports = {
  encode: (data) => {
    const timeBasedDataUShort = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    timeBasedDataUShort.writeInt64(data.timeStamp, TIMESTAMP_OFFSET);
    timeBasedDataUShort.writeInt32(data.timeStamp, TIMESTAMP_OFFSET + MILLISEC_SIZE);
    timeBasedDataUShort.writeString(data.name + '\0'.repeat(NAME_SIZE - data.name.length), NAME_OFFSET);
    timeBasedDataUShort.writeUint16(data.value, VALUE_OFFSET);
    return { value: timeBasedDataUShort.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'finetime',
        name: 'timeStamp',
        size: {
          millisec: MILLISEC_SIZE,
          picosec: PICOSEC_SIZE,
        },
        offset: {
          millisec: TIMESTAMP_OFFSET,
          picosec: TIMESTAMP_OFFSET + MILLISEC_SIZE,
        },
      },
      {
        type: 'string',
        name: 'name',
        size: NAME_SIZE,
        offset: NAME_OFFSET,
      },
      {
        type: 'ushort',
        name: 'value',
        size: VALUE_SIZE,
        offset: VALUE_OFFSET,
      },
    ],
  }),
};
