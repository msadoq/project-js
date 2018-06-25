// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus003Packet');
const stub = require('./pus003Packet.stub')();



describe('protobuf/isis/pusGroundModel/Pus003Packet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003Packet.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003Packet');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      sid: { type: 'uinteger', value: stub.sid },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      validityParameterExpectedValue: { type: 'string', value: stub.validityParameterExpectedValue },
      collectionInterval: { type: 'uinteger', value: stub.collectionInterval },
      status: { type: 'uoctet', value: stub.status },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      sidLabel: { type: 'string', value: stub.sidLabel },
      isCollectionIntervalSet: { type: 'boolean', value: stub.isCollectionIntervalSet },
      lastUpdateModeSid: { type: 'uoctet', value: stub.lastUpdateModeSid },
      lastUpdateTimeSid: { type: 'time', value: stub.lastUpdateTimeSid },
      lastUpdateModeStatus: { type: 'uoctet', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'time', value: stub.lastUpdateTimeStatus },
      lastUpdateModeValidParamId: { type: 'uoctet', value: stub.lastUpdateModeValidParamId },
      lastUpdateTimeValidParamId: { type: 'time', value: stub.lastUpdateTimeValidParamId },
      lastUpdateModeValidParamMask: { type: 'uoctet', value: stub.lastUpdateModeValidParamMask },
      lastUpdateTimeValidParamMask: { type: 'time', value: stub.lastUpdateTimeValidParamMask },
      lastUpdateModeValidParamExpValue: { type: 'uoctet', value: stub.lastUpdateModeValidParamExpValue },
      lastUpdateTimeValidParamExpValue: { type: 'time', value: stub.lastUpdateTimeValidParamExpValue },
      lastUpdateModeCollectInterval: { type: 'uoctet', value: stub.lastUpdateModeCollectInterval },
      lastUpdateTimeCollectInterval: { type: 'time', value: stub.lastUpdateTimeCollectInterval },
    });
    
  });
});
