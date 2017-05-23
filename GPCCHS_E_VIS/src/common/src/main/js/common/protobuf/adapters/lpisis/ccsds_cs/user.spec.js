// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/ccsds_cs/User', () => {
  const fixture = stubData.getUser();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_cs.User', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_cs.User', buffer);
    json.should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.login },
      password: { type: 'string', value: fixture.password },
      profile: { type: 'string', value: fixture.profile },
      userTime: { type: 'time', value: fixture.userTime },
    });
  });
});

