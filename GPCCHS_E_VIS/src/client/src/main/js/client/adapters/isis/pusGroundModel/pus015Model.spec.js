// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus015Model');
const stub = require('./pus015Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus015Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus015Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      noPacketStores: { type: 'uinteger', value: stub.noPacketStores },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus015PacketStore).toHaveLength(stub.pus015PacketStore.length);
    for (let i = 0; i < stub.pus015PacketStore.length; i += 1) {
      expect(decoded.pus015PacketStore[i]).toMatchObject({
        name: { type: 'string', value: stub.pus015PacketStore[i].name },
        id: { type: 'uinteger', value: stub.pus015PacketStore[i].id },
        status: { type: 'uinteger', value: stub.pus015PacketStore[i].status },
        storageType: { type: 'uinteger', value: stub.pus015PacketStore[i].storageType },
        dumpEnabled: { type: 'boolean', value: stub.pus015PacketStore[i].dumpEnabled },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus015PacketStore[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus015PacketStore[i].pusElement.lastUpdateTime },
        },
        hkStatusParameterName: { type: 'string', value: stub.pus015PacketStore[i].hkStatusParameterName },
      });
      expect(decoded.pus015PacketStore[i].pus015Packet).toHaveLength(stub.pus015PacketStore[i].pus015Packet.length);
      for (let ii = 0; ii < stub.pus015PacketStore[i].pus015Packet.length; ii += 1) {
        expect(decoded.pus015PacketStore[i].pus015Packet[ii]).toMatchObject({
          apid: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].apid },
          serviceTpe: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].serviceTpe },
          serviceSubType: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].serviceSubType },
          sid: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].sid },
          subsamplingRatio: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].subsamplingRatio },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus015PacketStore[i].pus015Packet[ii].pusElement.lastUpdateTime },
          },
          packetType: { type: 'uinteger', value: stub.pus015PacketStore[i].pus015Packet[ii].packetType },
          sidLabel: { type: 'string', value: stub.pus015PacketStore[i].pus015Packet[ii].sidLabel },
        });
        
      }
    }
  });
});
