// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./profileRight');
const { getProfileRight } = require('../stubs');



describe('protobuf/isis/file/ProfileRight', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProfileRight.proto`, { keepCase: true })
    .lookup('file.protobuf.ProfileRight');
  const fixture = getProfileRight();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      read: { type: 'boolean', value: fixture.read },
      changeAccessRight: { type: 'boolean', value: fixture.changeAccessRight },
      write: { type: 'boolean', value: fixture.write },
      profile: {
        login: { type: 'string', value: fixture.profile.login },
        password: { type: 'string', value: fixture.profile.password },
        profile: { type: 'string', value: fixture.profile.profile },
        userTime: { type: 'time', value: fixture.profile.userTime },
      },
    });
    
    
  });
});
