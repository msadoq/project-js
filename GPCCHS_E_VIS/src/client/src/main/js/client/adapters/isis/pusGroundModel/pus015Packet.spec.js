// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus015Packet');
const stub = require('./pus015Packet.stub')();



describe('protobuf/isis/pusGroundModel/Pus015Packet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015Packet.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus015Packet');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      serviceTpe: { type: 'uinteger', value: stub.serviceTpe },
      serviceSubType: { type: 'uinteger', value: stub.serviceSubType },
      sid: { type: 'uinteger', value: stub.sid },
      subsamplingRatio: { type: 'uinteger', value: stub.subsamplingRatio },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      packetType: { type: 'uinteger', value: stub.packetType },
      sidLabel: { type: 'string', value: stub.sidLabel },
    });
    
  });
});
