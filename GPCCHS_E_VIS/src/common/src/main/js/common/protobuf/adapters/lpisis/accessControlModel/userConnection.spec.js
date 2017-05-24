// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/accessControlModel/UserConnection', () => {
  const fixture = stubData.getUserConnection();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.accessControlModel.UserConnection', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.accessControlModel.UserConnection', buffer);
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

