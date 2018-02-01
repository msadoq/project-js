// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const lONG = require('../ccsds_mal/lONG');
const tIME = require('../ccsds_mal/tIME');

const USERID_SIZE = 8;
const USERID_OFFSET = 0;
const CURRENTPROFILEID_SIZE = 8;
const CURRENTPROFILEID_OFFSET = USERID_OFFSET + USERID_SIZE;
const USERCONTEXTTIME_SIZE = 8;
const USERCONTEXTTIME_OFFSET = CURRENTPROFILEID_OFFSET + CURRENTPROFILEID_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const userContext = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    lONG.encodeRaw(data.userId, userContext, USERID_OFFSET + offset, USERID_SIZE);
    lONG.encodeRaw(data.currentProfileId, userContext, CURRENTPROFILEID_OFFSET + offset, CURRENTPROFILEID_SIZE);
    tIME.encodeRaw(data.userContextTime, userContext, USERCONTEXTTIME_OFFSET + offset, USERCONTEXTTIME_SIZE);
    return userContext.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const userContext = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    userContext.userId = lONG.decodeRaw(null, bufferedData, USERID_OFFSET + offset, USERID_SIZE);
    userContext.currentProfileId = lONG.decodeRaw(null, bufferedData, CURRENTPROFILEID_OFFSET + offset, CURRENTPROFILEID_SIZE);
    userContext.userContextTime = tIME.decodeRaw(null, bufferedData, USERCONTEXTTIME_OFFSET + offset, USERCONTEXTTIME_SIZE);
    return userContext;
  },
};
