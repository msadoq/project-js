// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./flowInfo');
const stub = require('./flowInfo.stub')();



describe('protobuf/isis/connection/FlowInfo', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlowInfo.proto`, { keepCase: true })
    .lookup('connection.protobuf.FlowInfo');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'string', value: stub.name },
      isDefault: { type: 'boolean', value: stub.isDefault },
    });
    
  });
});
