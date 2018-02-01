// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const sTRING = require('../ccsds_mal/sTRING');
const tIME = require('../ccsds_mal/tIME');

const LOGIN_SIZE = 16;
const LOGIN_OFFSET = 0;
const PASSWORD_SIZE = 64;
const PASSWORD_OFFSET = LOGIN_OFFSET + LOGIN_SIZE;
const PROFILE_SIZE = 256;
const PROFILE_OFFSET = PASSWORD_OFFSET + PASSWORD_SIZE;
const USERTIME_SIZE = 8;
const USERTIME_OFFSET = PROFILE_OFFSET + PROFILE_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const user = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    sTRING.encodeRaw(data.login, user, LOGIN_OFFSET + offset, LOGIN_SIZE);
    sTRING.encodeRaw(data.password, user, PASSWORD_OFFSET + offset, PASSWORD_SIZE);
    sTRING.encodeRaw(data.profile, user, PROFILE_OFFSET + offset, PROFILE_SIZE);
    tIME.encodeRaw(data.userTime, user, USERTIME_OFFSET + offset, USERTIME_SIZE);
    return user.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const user = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    user.login = sTRING.decodeRaw(null, bufferedData, LOGIN_OFFSET + offset, LOGIN_SIZE);
    user.password = sTRING.decodeRaw(null, bufferedData, PASSWORD_OFFSET + offset, PASSWORD_SIZE);
    user.profile = sTRING.decodeRaw(null, bufferedData, PROFILE_OFFSET + offset, PROFILE_SIZE);
    user.userTime = tIME.decodeRaw(null, bufferedData, USERTIME_OFFSET + offset, USERTIME_SIZE);
    return user;
  },
};
