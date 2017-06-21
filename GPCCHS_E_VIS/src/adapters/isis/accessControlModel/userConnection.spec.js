// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./userConnection');
const { getUserConnection } = require('../stubs');



describe('protobuf/isis/accessControlModel/UserConnection', () => {
  const fixture = getUserConnection();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      userName: { type: 'string', value: fixture.userName },
      serverName: { type: 'string', value: fixture.serverName },
      terminalId: { type: 'string', value: fixture.terminalId },
      genericAccount: { type: 'string', value: fixture.genericAccount },
      loginTime: { type: 'time', value: fixture.loginTime },
      authID: { type: 'blob', value: fixture.authID },
    });
    
  });
});
