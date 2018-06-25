// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./sooState');
const stub = require('./sooState.stub')();



describe('protobuf/isis/soo/SooState', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SooState.proto`, { keepCase: true })
    .lookup('soo.protobuf.SooState');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      isRunning: { type: 'boolean', value: stub.isRunning },
    });
    
  });
});
