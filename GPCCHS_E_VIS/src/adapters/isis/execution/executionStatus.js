// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const STATUS_SIZE = 4;
const STATUS_OFFSET = 0;
const STATUSTIME_SIZE = 8;
const STATUSTIME_OFFSET = STATUS_OFFSET + STATUS_SIZE;

module.exports = {
  encode: (data) => {
    const executionStatus = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    executionStatus.writeInt32(data.status, STATUS_OFFSET);
    executionStatus.writeUint64(data.statusTime, STATUSTIME_OFFSET);
    return { value: executionStatus.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'integer',
        name: 'status',
        size: STATUS_SIZE,
        offset: STATUS_OFFSET,
      },
      {
        type: 'time',
        name: 'statusTime',
        size: STATUSTIME_SIZE,
        offset: STATUSTIME_OFFSET,
      },
    ],
  }),
};
