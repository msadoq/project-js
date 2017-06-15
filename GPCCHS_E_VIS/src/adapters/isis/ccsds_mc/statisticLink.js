// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const COLLECTIONINTERVAL_SIZE = 4;
const COLLECTIONINTERVAL_OFFSET = 0;
const REPORTINGINTERVAL_SIZE = 4;
const REPORTINGINTERVAL_OFFSET = COLLECTIONINTERVAL_OFFSET + COLLECTIONINTERVAL_SIZE; 
const SAMPLINGINTERVAL_SIZE = 4;
const SAMPLINGINTERVAL_OFFSET = REPORTINGINTERVAL_OFFSET + REPORTINGINTERVAL_SIZE; 
const REPORTINGENABLED_SIZE = 1;
const REPORTINGENABLED_OFFSET = SAMPLINGINTERVAL_OFFSET + SAMPLINGINTERVAL_SIZE; 
const STARTTIME_SIZE = 8;
const STARTTIME_OFFSET = REPORTINGENABLED_OFFSET + REPORTINGENABLED_SIZE;

module.exports = {
  encode: (data) => {
    const statisticLink = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    statisticLink.writeInt32(data.collectionInterval, COLLECTIONINTERVAL_OFFSET);
    statisticLink.writeInt32(data.reportingInterval, REPORTINGINTERVAL_OFFSET);
    statisticLink.writeInt32(data.samplingInterval, SAMPLINGINTERVAL_OFFSET);
    statisticLink.writeByte(data.reportingEnabled, REPORTINGENABLED_OFFSET);
    statisticLink.writeUint64(data.startTime, STARTTIME_OFFSET);
    return { value: statisticLink.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'duration',
        name: 'collectionInterval',
        size: COLLECTIONINTERVAL_SIZE,
        offset: COLLECTIONINTERVAL_OFFSET,
      },
      {
        type: 'duration',
        name: 'reportingInterval',
        size: REPORTINGINTERVAL_SIZE,
        offset: REPORTINGINTERVAL_OFFSET,
      },
      {
        type: 'duration',
        name: 'samplingInterval',
        size: SAMPLINGINTERVAL_SIZE,
        offset: SAMPLINGINTERVAL_OFFSET,
      },
      {
        type: 'boolean',
        name: 'reportingEnabled',
        size: REPORTINGENABLED_SIZE,
        offset: REPORTINGENABLED_OFFSET,
      },
      {
        type: 'time',
        name: 'startTime',
        size: STARTTIME_SIZE,
        offset: STARTTIME_OFFSET,
      },
    ],
  }),
};
