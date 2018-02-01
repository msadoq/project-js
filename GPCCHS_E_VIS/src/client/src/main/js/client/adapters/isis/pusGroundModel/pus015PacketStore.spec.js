// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus015PacketStore');
const stub = require('./pus015PacketStore.stub')();



describe('protobuf/isis/pusGroundModel/Pus015PacketStore', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015PacketStore.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus015PacketStore');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'string', value: stub.name },
      id: { type: 'uinteger', value: stub.id },
      status: { type: 'uinteger', value: stub.status },
      storageType: { type: 'uinteger', value: stub.storageType },
      dumpEnabled: { type: 'boolean', value: stub.dumpEnabled },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      hkStatusParameterName: { type: 'string', value: stub.hkStatusParameterName },
    });
    expect(decoded.pus015Packet).toHaveLength(stub.pus015Packet.length);
    for (let i = 0; i < stub.pus015Packet.length; i += 1) {
      expect(decoded.pus015Packet[i]).toMatchObject({
        apid: { type: 'uinteger', value: stub.pus015Packet[i].apid },
        serviceTpe: { type: 'uinteger', value: stub.pus015Packet[i].serviceTpe },
        serviceSubType: { type: 'uinteger', value: stub.pus015Packet[i].serviceSubType },
        sid: { type: 'uinteger', value: stub.pus015Packet[i].sid },
        subsamplingRatio: { type: 'uinteger', value: stub.pus015Packet[i].subsamplingRatio },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus015Packet[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus015Packet[i].pusElement.lastUpdateTime },
        },
        packetType: { type: 'uinteger', value: stub.pus015Packet[i].packetType },
        sidLabel: { type: 'string', value: stub.pus015Packet[i].sidLabel },
      });
      
    }
  });
});
