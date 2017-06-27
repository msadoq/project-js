// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./memoryImage');
const stub = require('./memoryImage.stub')();



describe('protobuf/isis/memoryImage/MemoryImage', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/MemoryImage.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.MemoryImage');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      map: (typeof stub.map === 'undefined')
        ? null
        : {
          
        },
    });
    expect(decoded.binaryData).toHaveLength(stub.binaryData.length);
    for (let i = 0; i < stub.binaryData.length; i += 1) {
      expect(decoded.binaryData[i]).toMatchObject({
        address: { type: 'ulong', symbol: `${stub.binaryData[i].address}` },
        data: { type: 'string', value: stub.binaryData[i].data },
      });
      
    }
  });
});
