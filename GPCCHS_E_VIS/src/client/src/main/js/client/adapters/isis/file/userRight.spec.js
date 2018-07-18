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
      execute: { type: 'boolean', value: stub.execute },
    });
    
  });
});
