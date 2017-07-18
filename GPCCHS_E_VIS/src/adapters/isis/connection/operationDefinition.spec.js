// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./operationDefinition');
const stub = require('./operationDefinition.stub')();



describe('protobuf/isis/connection/OperationDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OperationDefinition.proto`, { keepCase: true })
    .lookup('connection.protobuf.OperationDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      operationName: { type: 'string', value: stub.operationName },
    });
    expect(decoded.parameters).toHaveLength(stub.parameters.length);
    for (let i = 0; i < stub.parameters.length; i += 1) {
      expect(decoded.parameters[i]).toMatchObject({
        type: 'string',
        value: stub.parameters[i],
      });
    }
  });
});
