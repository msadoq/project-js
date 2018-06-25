// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014HkOrDiagPacket');
const stub = require('./pus014HkOrDiagPacket.stub')();



describe('protobuf/isis/pusGroundModel/Pus014HkOrDiagPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014HkOrDiagPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014HkOrDiagPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      subsamplingRatio: { type: 'uinteger', value: stub.subsamplingRatio },
      sid: { type: 'uinteger', value: stub.sid },
      pus014ForwardedPacket: {
        apid: { type: 'uinteger', value: stub.pus014ForwardedPacket.apid },
        forwardingStatus: { type: 'boolean', value: stub.pus014ForwardedPacket.forwardingStatus },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus014ForwardedPacket.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus014ForwardedPacket.pusElement.lastUpdateTime },
        },
        lastUpdateModeFwdStatus: { type: 'uinteger', value: stub.pus014ForwardedPacket.lastUpdateModeFwdStatus },
        lastUpdateTimeFwdStatus: { type: 'time', value: stub.pus014ForwardedPacket.lastUpdateTimeFwdStatus },
      },
      sidLabel: { type: 'string', value: stub.sidLabel },
      lastUpdateModeSid: { type: 'uinteger', value: stub.lastUpdateModeSid },
      lastUpdateTimeSid: { type: 'time', value: stub.lastUpdateTimeSid },
      lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.lastUpdateModeSubSamplingRatio },
      lastUpdateTimeSubSamplingRatio: { type: 'time', value: stub.lastUpdateTimeSubSamplingRatio },
    });
    
  });
});
