// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./binaryData');
const stub = require('./binaryData.stub')();



describe('protobuf/isis/memoryImage/BinaryData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/BinaryData.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.BinaryData');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      address: { type: 'ulong', symbol: `${stub.address}` },
      data: { type: 'string', value: stub.data },
    });
    
  });
});
