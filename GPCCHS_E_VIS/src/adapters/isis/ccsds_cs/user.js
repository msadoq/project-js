// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const LOGIN_SIZE = 16;
const LOGIN_OFFSET = 0;
const PASSWORD_SIZE = 64;
const PASSWORD_OFFSET = LOGIN_OFFSET + LOGIN_SIZE; 
const PROFILE_SIZE = 256;
const PROFILE_OFFSET = PASSWORD_OFFSET + PASSWORD_SIZE; 
const USERTIME_SIZE = 8;
const USERTIME_OFFSET = PROFILE_OFFSET + PROFILE_SIZE;

module.exports = {
  encode: (data) => {
    const user = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    user.writeString(data.login + '\0'.repeat(LOGIN_SIZE - data.login.length), LOGIN_OFFSET);
    user.writeString(data.password + '\0'.repeat(PASSWORD_SIZE - data.password.length), PASSWORD_OFFSET);
    user.writeString(data.profile + '\0'.repeat(PROFILE_SIZE - data.profile.length), PROFILE_OFFSET);
    user.writeUint64(data.userTime, USERTIME_OFFSET);
    return { value: user.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'string',
        name: 'login',
        size: LOGIN_SIZE,
        offset: LOGIN_OFFSET,
      },
      {
        type: 'string',
        name: 'password',
        size: PASSWORD_SIZE,
        offset: PASSWORD_OFFSET,
      },
      {
        type: 'string',
        name: 'profile',
        size: PROFILE_SIZE,
        offset: PROFILE_OFFSET,
      },
      {
        type: 'time',
        name: 'userTime',
        size: USERTIME_SIZE,
        offset: USERTIME_OFFSET,
      },
    ],
  }),
};
