// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const iDENTIFIER = require('../ccsds_mal/iDENTIFIER');
const tIME = require('../ccsds_mal/tIME');

const LOGINROLEIDENTIFIER_SIZE = 8;
const LOGINROLEIDENTIFIER_OFFSET = 0;
const LOGINROLETIME_SIZE = 8;
const LOGINROLETIME_OFFSET = LOGINROLEIDENTIFIER_OFFSET + LOGINROLEIDENTIFIER_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const loginRole = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    iDENTIFIER.encodeRaw(data.loginRoleIdentifier, loginRole, LOGINROLEIDENTIFIER_OFFSET + offset, LOGINROLEIDENTIFIER_SIZE);
    tIME.encodeRaw(data.loginRoleTime, loginRole, LOGINROLETIME_OFFSET + offset, LOGINROLETIME_SIZE);
    return loginRole.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const loginRole = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    loginRole.loginRoleIdentifier = iDENTIFIER.decodeRaw(null, bufferedData, LOGINROLEIDENTIFIER_OFFSET + offset, LOGINROLEIDENTIFIER_SIZE);
    loginRole.loginRoleTime = tIME.decodeRaw(null, bufferedData, LOGINROLETIME_OFFSET + offset, LOGINROLETIME_SIZE);
    return loginRole;
  },
};
