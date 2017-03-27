// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/ccsds_cs/UserContext', () => {
  const fixture = stubData.getUserContext();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_cs.UserContext', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_cs.UserContext', buffer);
    json.should.be.an('object').that.have.properties({
      userId: { type: 'long', symbol: `${fixture.userId}` },
      currentProfileId: { type: 'long', symbol: `${fixture.currentProfileId}` },
      userContextTime: { type: 'time', value: fixture.userContextTime },
    });
    
  });
});

