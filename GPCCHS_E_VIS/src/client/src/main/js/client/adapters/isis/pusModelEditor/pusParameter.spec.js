// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusParameter');
const stub = require('./pusParameter.stub')();



describe('protobuf/isis/pusModelEditor/PusParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusParameter.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.PusParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      parameterId: { type: 'uinteger', value: stub.parameterId },
      parameterName: { type: 'string', value: stub.parameterName },
      value: { type: 'string', value: stub.value },
    });
    
  });
});
