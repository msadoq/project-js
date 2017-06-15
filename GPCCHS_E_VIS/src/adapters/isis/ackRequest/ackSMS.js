// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const SYSTEMCREATIONDATE_SIZE = 8;
const SYSTEMCREATIONDATE_OFFSET = 0;
const APPLICATIONCREATIONDATE_SIZE = 8;
const APPLICATIONCREATIONDATE_OFFSET = SYSTEMCREATIONDATE_OFFSET + SYSTEMCREATIONDATE_SIZE;

module.exports = {
  encode: (data) => {
    const ackSMS = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    ackSMS.writeUint64(data.SystemCreationDate, SYSTEMCREATIONDATE_OFFSET);
    ackSMS.writeUint64(data.ApplicationCreationDate, APPLICATIONCREATIONDATE_OFFSET);
    return { value: ackSMS.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'time',
        name: 'systemCreationDate',
        size: SYSTEMCREATIONDATE_SIZE,
        offset: SYSTEMCREATIONDATE_OFFSET,
      },
      {
        type: 'time',
        name: 'applicationCreationDate',
        size: APPLICATIONCREATIONDATE_SIZE,
        offset: APPLICATIONCREATIONDATE_OFFSET,
      },
    ],
  }),
};
