// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus015PacketStore');
const stub = require('./pus015PacketStore.stub')();



describe('protobuf/isis/pusModelEditor/Pus015PacketStore', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015PacketStore.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus015PacketStore');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      storeId: { type: 'uinteger', value: stub.storeId },
      status: { type: 'uinteger', value: stub.status },
      storageType: { type: 'string', value: stub.storageType },
      dumpEnabled: { type: 'boolean', value: stub.dumpEnabled },
      hkStatusParameterName: { type: 'string', value: stub.hkStatusParameterName },
      lastUpdateModeStoreId: { type: 'uinteger', value: stub.lastUpdateModeStoreId },
      lastUpdateTimeStoreId: { type: 'string', value: stub.lastUpdateTimeStoreId },
      lastUpdateModeStoreType: { type: 'uinteger', value: stub.lastUpdateModeStoreType },
      lastUpdateTimeStoreType: { type: 'string', value: stub.lastUpdateTimeStoreType },
      lastUpdateModeStoreStatus: { type: 'uinteger', value: stub.lastUpdateModeStoreStatus },
      lastUpdateTimeStoreStatus: { type: 'string', value: stub.lastUpdateTimeStoreStatus },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      storeName: { type: 'string', value: stub.storeName },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      listPossibleDownlinkVcs: { type: 'string', value: stub.listPossibleDownlinkVcs },
    });
    expect(decoded.pus015Packet).toHaveLength(stub.pus015Packet.length);
    for (let i = 0; i < stub.pus015Packet.length; i += 1) {
      expect(decoded.pus015Packet[i]).toMatchObject({
        packetApid: { type: 'uinteger', value: stub.pus015Packet[i].packetApid },
        serviceType: { type: 'uinteger', value: stub.pus015Packet[i].serviceType },
        serviceSubType: { type: 'uinteger', value: stub.pus015Packet[i].serviceSubType },
        sid: { type: 'uinteger', value: stub.pus015Packet[i].sid },
        subsamplingRatio: { type: 'uinteger', value: stub.pus015Packet[i].subsamplingRatio },
        packetType: { type: 'string', value: stub.pus015Packet[i].packetType },
        sidLabel: { type: 'string', value: stub.pus015Packet[i].sidLabel },
        isSubsamplingRatioSet: { type: 'boolean', value: stub.pus015Packet[i].isSubsamplingRatioSet },
        lastUpdateModePacketId: { type: 'uinteger', value: stub.pus015Packet[i].lastUpdateModePacketId },
        lastUpdateTimePacketId: { type: 'string', value: stub.pus015Packet[i].lastUpdateTimePacketId },
        lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.pus015Packet[i].lastUpdateModeSubSamplingRatio },
        lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.pus015Packet[i].lastUpdateTimeSubSamplingRatio },
        serviceApid: { type: 'uinteger', value: stub.pus015Packet[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus015Packet[i].serviceApidName },
        packetApidName: { type: 'string', value: stub.pus015Packet[i].packetApidName },
        sidName: { type: 'string', value: stub.pus015Packet[i].sidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus015Packet[i].uniqueId}` },
      });
      
    }
  });
});
