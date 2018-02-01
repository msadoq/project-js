// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const bLOB = require('../ccsds_mal/bLOB');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

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
  encodeRaw: (data, buffer, offset = 0) => {
    const userConnection = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    sTRING.encodeRaw(data.userName, userConnection, USERNAME_OFFSET + offset, USERNAME_SIZE);
    sTRING.encodeRaw(data.serverName, userConnection, SERVERNAME_OFFSET + offset, SERVERNAME_SIZE);
    sTRING.encodeRaw(data.terminalId, userConnection, TERMINALID_OFFSET + offset, TERMINALID_SIZE);
    sTRING.encodeRaw(data.genericAccount, userConnection, GENERICACCOUNT_OFFSET + offset, GENERICACCOUNT_SIZE);
    tIME.encodeRaw(data.loginTime, userConnection, LOGINTIME_OFFSET + offset, LOGINTIME_SIZE);
    bLOB.encodeRaw(data.authID, userConnection, AUTHID_OFFSET + offset, AUTHID_SIZE);
    return userConnection.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const userConnection = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    userConnection.userName = sTRING.decodeRaw(null, bufferedData, USERNAME_OFFSET + offset, USERNAME_SIZE);
    userConnection.serverName = sTRING.decodeRaw(null, bufferedData, SERVERNAME_OFFSET + offset, SERVERNAME_SIZE);
    userConnection.terminalId = sTRING.decodeRaw(null, bufferedData, TERMINALID_OFFSET + offset, TERMINALID_SIZE);
    userConnection.genericAccount = sTRING.decodeRaw(null, bufferedData, GENERICACCOUNT_OFFSET + offset, GENERICACCOUNT_SIZE);
    userConnection.loginTime = tIME.decodeRaw(null, bufferedData, LOGINTIME_OFFSET + offset, LOGINTIME_SIZE);
    userConnection.authID = bLOB.decodeRaw(null, bufferedData, AUTHID_OFFSET + offset, AUTHID_SIZE);
    return userConnection;
  },
};
