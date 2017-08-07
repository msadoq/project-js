// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./profileRight');
const stub = require('./profileRight.stub')();



describe('protobuf/isis/file/ProfileRight', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProfileRight.proto`, { keepCase: true })
    .lookup('file.protobuf.ProfileRight');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      read: { type: 'boolean', value: stub.read },
      changeAccessRight: { type: 'boolean', value: stub.changeAccessRight },
      write: { type: 'boolean', value: stub.write },
      profile: {
        login: { type: 'string', value: stub.profile.login },
        password: { type: 'string', value: stub.profile.password },
        profile: { type: 'string', value: stub.profile.profile },
        userTime: { type: 'time', value: stub.profile.userTime },
      },
    });
    
  });
});
