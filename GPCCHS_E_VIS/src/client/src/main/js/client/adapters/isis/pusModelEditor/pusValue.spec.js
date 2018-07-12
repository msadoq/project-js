// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusValue');
const stub = require('./pusValue.stub')();



describe('protobuf/isis/pusModelEditor/PusValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusValue.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.PusValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      value: { type: 'string', value: stub.value },
    });
    
  });
});
