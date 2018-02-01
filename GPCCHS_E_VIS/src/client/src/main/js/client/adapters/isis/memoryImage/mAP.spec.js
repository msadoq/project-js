// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./mAP');
const stub = require('./mAP.stub')();



describe('protobuf/isis/memoryImage/MAP', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/MAP.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.MAP');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.data).toHaveLength(stub.data.length);
    for (let i = 0; i < stub.data.length; i += 1) {
      expect(decoded.data[i]).toMatchObject({
        label: { type: 'string', value: stub.data[i].label },
        address: { type: 'ulong', symbol: `${stub.data[i].address}` },
        dataSize: { type: 'uinteger', value: stub.data[i].dataSize },
      });
      
    }
  });
});
