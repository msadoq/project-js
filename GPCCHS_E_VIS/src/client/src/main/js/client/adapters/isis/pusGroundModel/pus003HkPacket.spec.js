// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus003HkPacket');
const stub = require('./pus003HkPacket.stub')();



describe('protobuf/isis/pusGroundModel/Pus003HkPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003HkPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003HkPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      generationMode: { type: 'uoctet', value: stub.generationMode },
      pus003Packet: {
        sid: { type: 'uinteger', value: stub.pus003Packet.sid },
        validityParameterId: { type: 'uinteger', value: stub.pus003Packet.validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pus003Packet.validityParameterMask },
        validityParameterExpectedValue: { type: 'string', value: stub.pus003Packet.validityParameterExpectedValue },
        collectionInterval: { type: 'uinteger', value: stub.pus003Packet.collectionInterval },
        status: { type: 'uoctet', value: stub.pus003Packet.status },
        pusElement: {
          lastUpdateMode: { type: 'uoctet', value: stub.pus003Packet.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus003Packet.pusElement.lastUpdateTime },
        },
        sidLabel: { type: 'string', value: stub.pus003Packet.sidLabel },
        isCollectionIntervalSet: { type: 'boolean', value: stub.pus003Packet.isCollectionIntervalSet },
        lastUpdateModeSid: { type: 'uoctet', value: stub.pus003Packet.lastUpdateModeSid },
        lastUpdateTimeSid: { type: 'time', value: stub.pus003Packet.lastUpdateTimeSid },
        lastUpdateModeStatus: { type: 'uoctet', value: stub.pus003Packet.lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'time', value: stub.pus003Packet.lastUpdateTimeStatus },
        lastUpdateModeValidParamId: { type: 'uoctet', value: stub.pus003Packet.lastUpdateModeValidParamId },
        lastUpdateTimeValidParamId: { type: 'time', value: stub.pus003Packet.lastUpdateTimeValidParamId },
        lastUpdateModeValidParamMask: { type: 'uoctet', value: stub.pus003Packet.lastUpdateModeValidParamMask },
        lastUpdateTimeValidParamMask: { type: 'time', value: stub.pus003Packet.lastUpdateTimeValidParamMask },
        lastUpdateModeValidParamExpValue: { type: 'uoctet', value: stub.pus003Packet.lastUpdateModeValidParamExpValue },
        lastUpdateTimeValidParamExpValue: { type: 'time', value: stub.pus003Packet.lastUpdateTimeValidParamExpValue },
        lastUpdateModeCollectInterval: { type: 'uoctet', value: stub.pus003Packet.lastUpdateModeCollectInterval },
        lastUpdateTimeCollectInterval: { type: 'time', value: stub.pus003Packet.lastUpdateTimeCollectInterval },
      },
      lastUpdateTimeGenMode: { type: 'time', value: stub.lastUpdateTimeGenMode },
      lastUpdateModeGenMode: { type: 'uoctet', value: stub.lastUpdateModeGenMode },
    });
    
  });
});
