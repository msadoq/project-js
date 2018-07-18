// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014Model');
const stub = require('./pus014Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus014Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus014Model');
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
    expect(decoded.pus014TmPacket).toHaveLength(stub.pus014TmPacket.length);
    for (let i = 0; i < stub.pus014TmPacket.length; i += 1) {
      expect(decoded.pus014TmPacket[i]).toMatchObject({
        packetApid: { type: 'uinteger', value: stub.pus014TmPacket[i].packetApid },
        forwardingStatusTypeSubtype: { type: 'uinteger', value: stub.pus014TmPacket[i].forwardingStatusTypeSubtype },
        lastUpdateModeFwdStatusTypeSubtype: { type: 'uinteger', value: stub.pus014TmPacket[i].lastUpdateModeFwdStatusTypeSubtype },
        lastUpdateTimeFwdStatusTypeSubtype: { type: 'string', value: stub.pus014TmPacket[i].lastUpdateTimeFwdStatusTypeSubtype },
        packetApidName: { type: 'string', value: stub.pus014TmPacket[i].packetApidName },
        serviceApid: { type: 'uinteger', value: stub.pus014TmPacket[i].serviceApid },
        packetName: { type: 'string', value: stub.pus014TmPacket[i].packetName },
        serviceApidName: { type: 'string', value: stub.pus014TmPacket[i].serviceApidName },
        lastUpdateModeRid: { type: 'uinteger', value: stub.pus014TmPacket[i].lastUpdateModeRid },
        lastUpdateTimeRid: { type: 'string', value: stub.pus014TmPacket[i].lastUpdateTimeRid },
        rid: { type: 'uinteger', value: stub.pus014TmPacket[i].rid },
        ridLabel: { type: 'string', value: stub.pus014TmPacket[i].ridLabel },
        lastUpdateModeSid: { type: 'uinteger', value: stub.pus014TmPacket[i].lastUpdateModeSid },
        lastUpdateTimeSid: { type: 'string', value: stub.pus014TmPacket[i].lastUpdateTimeSid },
        lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.pus014TmPacket[i].lastUpdateModeSubSamplingRatio },
        lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.pus014TmPacket[i].lastUpdateTimeSubSamplingRatio },
        subsamplingRatio: { type: 'uinteger', value: stub.pus014TmPacket[i].subsamplingRatio },
        sid: { type: 'uinteger', value: stub.pus014TmPacket[i].sid },
        sidLabel: { type: 'string', value: stub.pus014TmPacket[i].sidLabel },
        lastUpdateModeTypeSubType: { type: 'uinteger', value: stub.pus014TmPacket[i].lastUpdateModeTypeSubType },
        lastUpdateTimeTypeSubType: { type: 'string', value: stub.pus014TmPacket[i].lastUpdateTimeTypeSubType },
        serviceType: { type: 'uinteger', value: stub.pus014TmPacket[i].serviceType },
        serviceSubType: { type: 'uinteger', value: stub.pus014TmPacket[i].serviceSubType },
        uniqueId: { type: 'ulong', symbol: `${stub.pus014TmPacket[i].uniqueId}` },
        status: { type: 'uinteger', value: stub.pus014TmPacket[i].status },
      });
      
    }
  });
});
