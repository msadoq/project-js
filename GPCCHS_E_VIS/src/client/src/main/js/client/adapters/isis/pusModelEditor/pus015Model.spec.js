// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus015Model');
const stub = require('./pus015Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus015Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus015Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      groundDate: { type: 'time', value: stub.groundDate },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      status: { type: 'uinteger', value: stub.status },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus015PacketStore).toHaveLength(stub.pus015PacketStore.length);
    for (let i = 0; i < stub.pus015PacketStore.length; i += 1) {
      expect(decoded.pus015PacketStore[i]).toMatchObject({
        storeId: { type: 'uinteger', value: stub.pus015PacketStore[i].storeId },
        status: { type: 'uinteger', value: stub.pus015PacketStore[i].status },
        storageType: { type: 'string', value: stub.pus015PacketStore[i].storageType },
        dumpEnabled: { type: 'boolean', value: stub.pus015PacketStore[i].dumpEnabled },
        hkStatusParameterName: { type: 'string', value: stub.pus015PacketStore[i].hkStatusParameterName },
        lastUpdateModeStoreId: { type: 'uinteger', value: stub.pus015PacketStore[i].lastUpdateModeStoreId },
        lastUpdateTimeStoreId: { type: 'string', value: stub.pus015PacketStore[i].lastUpdateTimeStoreId },
        lastUpdateModeStoreType: { type: 'uinteger', value: stub.pus015PacketStore[i].lastUpdateModeStoreType },
        lastUpdateTimeStoreType: { type: 'string', value: stub.pus015PacketStore[i].lastUpdateTimeStoreType },
        lastUpdateModeStoreStatus: { type: 'uinteger', value: stub.pus015PacketStore[i].lastUpdateModeStoreStatus },
        lastUpdateTimeStoreStatus: { type: 'string', value: stub.pus015PacketStore[i].lastUpdateTimeStoreStatus },
        serviceApidName: { type: 'string', value: stub.pus015PacketStore[i].serviceApidName },
        storeName: { type: 'string', value: stub.pus015PacketStore[i].storeName },
        serviceApid: { type: 'uinteger', value: stub.pus015PacketStore[i].serviceApid },
        uniqueId: { type: 'ulong', symbol: `${stub.pus015PacketStore[i].uniqueId}` },
        listPossibleDownlinkVcs: { type: 'string', value: stub.pus015PacketStore[i].listPossibleDownlinkVcs },
      });
      expect(decoded.pus015PacketStore[i].pus015Packet).toHaveLength(stub.pus015PacketStore[i].pus015Packet.length);
      for (let ii = 0; ii < stub.pus015PacketStore[i].pus015Packet.length; ii += 1) {
        expect(decoded.pus015PacketStore[i].pus015Packet[ii]).toMatchObject({
          packetApid: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].packetApid },
          serviceType: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].serviceType },
          serviceSubType: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].serviceSubType },
          sid: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].sid },
          subsamplingRatio: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].subsamplingRatio },
          packetType: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].packetType },
          sidLabel: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].sidLabel },
          isSubsamplingRatioSet: { type: 'boolean', value: stub.pus015PacketStore[i].pus015Packet[ii].isSubsamplingRatioSet },
          lastUpdateModePacketId: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].lastUpdateModePacketId },
          lastUpdateTimePacketId: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].lastUpdateTimePacketId },
          lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].lastUpdateModeSubSamplingRatio },
          lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].lastUpdateTimeSubSamplingRatio },
          serviceApid: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].serviceApid },
          serviceApidName: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].serviceApidName },
          packetApidName: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].packetApidName },
          sidName: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].sidName },
          uniqueId: { type: 'ulong', symbol: `${stub.pus015PacketStore[i].pus015Packet[ii].uniqueId}` },
        });
        
      }
    }
  });
});
