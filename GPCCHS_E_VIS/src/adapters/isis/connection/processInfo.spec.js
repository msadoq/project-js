// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./processInfo');
const stub = require('./processInfo.stub')();



describe('protobuf/isis/connection/ProcessInfo', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProcessInfo.proto`, { keepCase: true })
    .lookup('connection.protobuf.ProcessInfo');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'string', value: stub.name },
    });
    
  });
});
