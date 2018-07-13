// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusMmePacketStore');
const stub = require('./pusMmePacketStore.stub')();



describe('protobuf/isis/pusModelEditor/PusMmePacketStore', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusMmePacketStore.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.PusMmePacketStore');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      storeName: { type: 'string', value: stub.storeName },
      storeId: { type: 'uinteger', value: stub.storeId },
      storeStatus: { type: 'uinteger', value: stub.storeStatus },
      subSamplingRatio: { type: 'uinteger', value: stub.subSamplingRatio },
      lastUpdateModeStoreId: { type: 'uinteger', value: stub.lastUpdateModeStoreId },
      lastUpdateTimeStoreId: { type: 'string', value: stub.lastUpdateTimeStoreId },
      lastUpdateModeStoreStatus: { type: 'uinteger', value: stub.lastUpdateModeStoreStatus },
      lastUpdateTimeStoreStatus: { type: 'string', value: stub.lastUpdateTimeStoreStatus },
      lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.lastUpdateModeSubSamplingRatio },
      lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.lastUpdateTimeSubSamplingRatio },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
