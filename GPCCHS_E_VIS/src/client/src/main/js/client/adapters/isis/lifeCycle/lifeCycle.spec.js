// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./lifeCycle');
const stub = require('./lifeCycle.stub')();



describe('protobuf/isis/lifeCycle/LifeCycle', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/LifeCycle.proto`, { keepCase: true })
    .lookup('lifeCycle.protobuf.LifeCycle');
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
    expect(decoded.launchingParameters).toHaveLength(stub.launchingParameters.length);
    for (let i = 0; i < stub.launchingParameters.length; i += 1) {
      expect(decoded.launchingParameters[i]).toMatchObject({
        name: { type: 'identifier', value: stub.launchingParameters[i].name },
        value: { type: 'double', symbol: stub.launchingParameters[i].value.toString() },
      });
      
    }
  });
});
