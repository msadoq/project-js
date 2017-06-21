// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./userRight');
const { getUserRight } = require('../stubs');



describe('protobuf/isis/file/UserRight', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/UserRight.proto`, { keepCase: true })
    .lookup('file.protobuf.UserRight');
  const fixture = getUserRight();
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
      user: {
        login: { type: 'string', value: fixture.user.login },
        password: { type: 'string', value: fixture.user.password },
        profile: { type: 'string', value: fixture.user.profile },
        userTime: { type: 'time', value: fixture.user.userTime },
      },
    });
    
    
  });
});
