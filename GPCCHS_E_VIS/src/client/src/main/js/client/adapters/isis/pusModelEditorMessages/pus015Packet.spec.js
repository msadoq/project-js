// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus015Packet');
const stub = require('./pus015Packet.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus015Packet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015Packet.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus015Packet');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      packetApid: { type: 'uinteger', value: stub.packetApid },
      serviceType: { type: 'uinteger', value: stub.serviceType },
      serviceSubType: { type: 'uinteger', value: stub.serviceSubType },
      sid: { type: 'uinteger', value: stub.sid },
      subsamplingRatio: { type: 'uinteger', value: stub.subsamplingRatio },
      packetType: { type: 'string', value: stub.packetType },
      sidLabel: { type: 'string', value: stub.sidLabel },
      isSubsamplingRatioSet: { type: 'boolean', value: stub.isSubsamplingRatioSet },
      lastUpdateModePacketId: { type: 'uinteger', value: stub.lastUpdateModePacketId },
      lastUpdateTimePacketId: { type: 'string', value: stub.lastUpdateTimePacketId },
      lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.lastUpdateModeSubSamplingRatio },
      lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.lastUpdateTimeSubSamplingRatio },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      packetApidName: { type: 'string', value: stub.packetApidName },
      sidName: { type: 'string', value: stub.sidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
