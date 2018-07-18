// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./processIdentifier');
const stub = require('./processIdentifier.stub')();



describe('protobuf/isis/connection/ProcessIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProcessIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.ProcessIdentifier');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      processId: { type: 'long', symbol: `${stub.processId}` },
      functionOId: { type: 'string', value: stub.functionOId },
      processInfo: (typeof stub.processInfo === 'undefined')
        ? null
        : {
          name: { type: 'string', value: stub.processInfo.name },
        },
    });
    
  });
});
