// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const MILLISEC_SIZE = 8;
const PICOSEC_SIZE = 4;
const TIMESTAMP_SIZE = MILLISEC_SIZE + PICOSEC_SIZE;
const TIMESTAMP_OFFSET = 0;
const NAME_SIZE = 30;
const NAME_OFFSET = TIMESTAMP_OFFSET + TIMESTAMP_SIZE; 
const VALUE_SIZE = 1;
const VALUE_OFFSET = NAME_OFFSET + NAME_SIZE;

module.exports = {
  encode: (data) => {
    const timeBasedDataBoolean = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    timeBasedDataBoolean.writeInt64(data.timeStamp, TIMESTAMP_OFFSET);
    timeBasedDataBoolean.writeInt32(data.timeStamp, TIMESTAMP_OFFSET + MILLISEC_SIZE);
    timeBasedDataBoolean.writeString(data.name + '\0'.repeat(NAME_SIZE - data.name.length), NAME_OFFSET);
    timeBasedDataBoolean.writeByte(data.value, VALUE_OFFSET);
    return { value: timeBasedDataBoolean.buffer };
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
        type: 'boolean',
        name: 'value',
        size: VALUE_SIZE,
        offset: VALUE_OFFSET,
      },
    ],
  }),
};
