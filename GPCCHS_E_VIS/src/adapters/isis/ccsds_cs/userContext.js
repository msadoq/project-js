// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const USERID_SIZE = 8;
const USERID_OFFSET = 0;
const CURRENTPROFILEID_SIZE = 8;
const CURRENTPROFILEID_OFFSET = USERID_OFFSET + USERID_SIZE; 
const USERCONTEXTTIME_SIZE = 8;
const USERCONTEXTTIME_OFFSET = CURRENTPROFILEID_OFFSET + CURRENTPROFILEID_SIZE;

module.exports = {
  encode: (data) => {
    const userContext = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    userContext.writeInt64(data.userId, USERID_OFFSET);
    userContext.writeInt64(data.currentProfileId, CURRENTPROFILEID_OFFSET);
    userContext.writeUint64(data.userContextTime, USERCONTEXTTIME_OFFSET);
    return { value: userContext.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'long',
        name: 'userId',
        size: USERID_SIZE,
        offset: USERID_OFFSET,
      },
      {
        type: 'long',
        name: 'currentProfileId',
        size: CURRENTPROFILEID_SIZE,
        offset: CURRENTPROFILEID_OFFSET,
      },
      {
        type: 'time',
        name: 'userContextTime',
        size: USERCONTEXTTIME_SIZE,
        offset: USERCONTEXTTIME_OFFSET,
      },
    ],
  }),
};
