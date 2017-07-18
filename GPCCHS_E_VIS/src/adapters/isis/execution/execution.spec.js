// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./execution');
const stub = require('./execution.stub')();



describe('protobuf/isis/execution/Execution', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Execution.proto`, { keepCase: true })
    .lookup('execution.protobuf.Execution');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      launchingTime: { type: 'time', value: stub.launchingTime },
    });
    expect(decoded.launchingParameter).toHaveLength(stub.launchingParameter.length);
    for (let i = 0; i < stub.launchingParameter.length; i += 1) {
      expect(decoded.launchingParameter[i]).toMatchObject({
        name: { type: 'identifier', value: stub.launchingParameter[i].name },
        value: { type: 'double', symbol: stub.launchingParameter[i].value.toString() },
      });
      
    }
  });
});
