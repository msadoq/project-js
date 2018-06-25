// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./operationParameter');
const stub = require('./operationParameter.stub')();



describe('protobuf/isis/operationParameter/OperationParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OperationParameter.proto`, { keepCase: true })
    .lookup('operationParameter.protobuf.OperationParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'string', value: stub.name },
      timestamp: { type: 'finetime', value: stub.timestamp },
      value: { type: 'double', symbol: stub.value.toString() },
    });
    
  });
});
