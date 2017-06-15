// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const STATUS_SIZE = 8;
const STATUS_OFFSET = 0;
const STATUSTIME_SIZE = 8;
const STATUSTIME_OFFSET = STATUS_OFFSET + STATUS_SIZE;

module.exports = {
  encode: (data) => {
    const lifeCycleStatus = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    lifeCycleStatus.writeUint64(data.status, STATUS_OFFSET);
    lifeCycleStatus.writeUint64(data.statusTime, STATUSTIME_OFFSET);
    return { value: lifeCycleStatus.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'ulong',
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
