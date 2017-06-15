// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
const ByteBuffer = require('bytebuffer');

const USERNAME_SIZE = 256;
const USERNAME_OFFSET = 0;
const SERVERNAME_SIZE = 256;
const SERVERNAME_OFFSET = USERNAME_OFFSET + USERNAME_SIZE; 
const TERMINALID_SIZE = 256;
const TERMINALID_OFFSET = SERVERNAME_OFFSET + SERVERNAME_SIZE; 
const GENERICACCOUNT_SIZE = 256;
const GENERICACCOUNT_OFFSET = TERMINALID_OFFSET + TERMINALID_SIZE; 
const LOGINTIME_SIZE = 8;
const LOGINTIME_OFFSET = GENERICACCOUNT_OFFSET + GENERICACCOUNT_SIZE; 
const AUTHID_SIZE = 4;
const AUTHID_OFFSET = LOGINTIME_OFFSET + LOGINTIME_SIZE;

module.exports = {
  encode: (data) => {
    const userConnection = new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    userConnection.writeString(data.userName + '\0'.repeat(USERNAME_SIZE - data.userName.length), USERNAME_OFFSET);
    userConnection.writeString(data.serverName + '\0'.repeat(SERVERNAME_SIZE - data.serverName.length), SERVERNAME_OFFSET);
    userConnection.writeString(data.terminalId + '\0'.repeat(TERMINALID_SIZE - data.terminalId.length), TERMINALID_OFFSET);
    userConnection.writeString(data.genericAccount + '\0'.repeat(GENERICACCOUNT_SIZE - data.genericAccount.length), GENERICACCOUNT_OFFSET);
    userConnection.writeUint64(data.loginTime, LOGINTIME_OFFSET);
    userConnection.writeString(data.authID + '\0'.repeat(AUTHID_SIZE - data.authID.length), AUTHID_OFFSET);
    return { value: userConnection.buffer };
  },
  decode: data => ({
    type: 'raw',
    value: data.value,
    fields: [
      {
        type: 'string',
        name: 'userName',
        size: USERNAME_SIZE,
        offset: USERNAME_OFFSET,
      },
      {
        type: 'string',
        name: 'serverName',
        size: SERVERNAME_SIZE,
        offset: SERVERNAME_OFFSET,
      },
      {
        type: 'string',
        name: 'terminalId',
        size: TERMINALID_SIZE,
        offset: TERMINALID_OFFSET,
      },
      {
        type: 'string',
        name: 'genericAccount',
        size: GENERICACCOUNT_SIZE,
        offset: GENERICACCOUNT_OFFSET,
      },
      {
        type: 'time',
        name: 'loginTime',
        size: LOGINTIME_SIZE,
        offset: LOGINTIME_OFFSET,
      },
      {
        type: 'blob',
        name: 'authID',
        size: AUTHID_SIZE,
        offset: AUTHID_OFFSET,
      },
    ],
  }),
};
