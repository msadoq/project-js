// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const LAUNCHINGPARAMETERS_SIZE = 64;
const LAUNCHINGPARAMETERS_OFFSET = 0;
const LAUNCHINGTIME_SIZE = 8;
const LAUNCHINGTIME_OFFSET = LAUNCHINGPARAMETERS_OFFSET + LAUNCHINGPARAMETERS_SIZE;

module.exports = {
  encode: (data) => {
    const lifeCycle = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    lifeCycle.writeUint64(data.launchingTime, LAUNCHINGTIME_OFFSET);
    return { value: lifeCycle.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'attribute',
        name: 'launchingParameters',
        size: LAUNCHINGPARAMETERS_SIZE,
        offset: LAUNCHINGPARAMETERS_OFFSET,
      },
      {
        type: 'time',
        name: 'launchingTime',
        size: LAUNCHINGTIME_SIZE,
        offset: LAUNCHINGTIME_OFFSET,
      },
    ],
  }),
};
