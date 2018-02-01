// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./userRight');
const stub = require('./userRight.stub')();



describe('protobuf/isis/file/UserRight', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/UserRight.proto`, { keepCase: true })
    .lookup('file.protobuf.UserRight');
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
      user: {
        login: { type: 'string', value: stub.user.login },
        password: { type: 'string', value: stub.user.password },
        profile: { type: 'string', value: stub.user.profile },
        userTime: { type: 'time', value: stub.user.userTime },
      },
    });
    
  });
});
