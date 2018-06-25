// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus003Model');
const stub = require('./pus003Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus003Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      numberHkPackets: { type: 'uinteger', value: stub.numberHkPackets },
      numberDiagPackets: { type: 'uinteger', value: stub.numberDiagPackets },
      apid: { type: 'uinteger', value: stub.apid },
      status: { type: 'uoctet', value: stub.status },
      groundDate: { type: 'time', value: stub.groundDate },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
    });
    expect(decoded.pus003DiagPacket).toHaveLength(stub.pus003DiagPacket.length);
    for (let i = 0; i < stub.pus003DiagPacket.length; i += 1) {
      expect(decoded.pus003DiagPacket[i]).toMatchObject({
        pus003Packet: {
          sid: { type: 'uinteger', value: stub.pus003DiagPacket[i].pus003Packet.sid },
          validityParameterId: { type: 'uinteger', value: stub.pus003DiagPacket[i].pus003Packet.validityParameterId },
          validityParameterMask: { type: 'string', value: stub.pus003DiagPacket[i].pus003Packet.validityParameterMask },
          validityParameterExpectedValue: { type: 'string', value: stub.pus003DiagPacket[i].pus003Packet.validityParameterExpectedValue },
          collectionInterval: { type: 'uinteger', value: stub.pus003DiagPacket[i].pus003Packet.collectionInterval },
          status: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.status },
          pusElement: {
            lastUpdateMode: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.pusElement.lastUpdateTime },
          },
          sidLabel: { type: 'string', value: stub.pus003DiagPacket[i].pus003Packet.sidLabel },
          isCollectionIntervalSet: { type: 'boolean', value: stub.pus003DiagPacket[i].pus003Packet.isCollectionIntervalSet },
          lastUpdateModeSid: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateModeSid },
          lastUpdateTimeSid: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateTimeSid },
          lastUpdateModeStatus: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateModeStatus },
          lastUpdateTimeStatus: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateTimeStatus },
          lastUpdateModeValidParamId: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateModeValidParamId },
          lastUpdateTimeValidParamId: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateTimeValidParamId },
          lastUpdateModeValidParamMask: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateModeValidParamMask },
          lastUpdateTimeValidParamMask: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateTimeValidParamMask },
          lastUpdateModeValidParamExpValue: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateModeValidParamExpValue },
          lastUpdateTimeValidParamExpValue: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateTimeValidParamExpValue },
          lastUpdateModeCollectInterval: { type: 'uoctet', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateModeCollectInterval },
          lastUpdateTimeCollectInterval: { type: 'time', value: stub.pus003DiagPacket[i].pus003Packet.lastUpdateTimeCollectInterval },
        },
      });
      
    }
    expect(decoded.pus003HkPacket).toHaveLength(stub.pus003HkPacket.length);
    for (let i = 0; i < stub.pus003HkPacket.length; i += 1) {
      expect(decoded.pus003HkPacket[i]).toMatchObject({
        generationMode: { type: 'uoctet', value: stub.pus003HkPacket[i].generationMode },
        pus003Packet: {
          sid: { type: 'uinteger', value: stub.pus003HkPacket[i].pus003Packet.sid },
          validityParameterId: { type: 'uinteger', value: stub.pus003HkPacket[i].pus003Packet.validityParameterId },
          validityParameterMask: { type: 'string', value: stub.pus003HkPacket[i].pus003Packet.validityParameterMask },
          validityParameterExpectedValue: { type: 'string', value: stub.pus003HkPacket[i].pus003Packet.validityParameterExpectedValue },
          collectionInterval: { type: 'uinteger', value: stub.pus003HkPacket[i].pus003Packet.collectionInterval },
          status: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.status },
          pusElement: {
            lastUpdateMode: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.pusElement.lastUpdateTime },
          },
          sidLabel: { type: 'string', value: stub.pus003HkPacket[i].pus003Packet.sidLabel },
          isCollectionIntervalSet: { type: 'boolean', value: stub.pus003HkPacket[i].pus003Packet.isCollectionIntervalSet },
          lastUpdateModeSid: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateModeSid },
          lastUpdateTimeSid: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateTimeSid },
          lastUpdateModeStatus: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateModeStatus },
          lastUpdateTimeStatus: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateTimeStatus },
          lastUpdateModeValidParamId: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateModeValidParamId },
          lastUpdateTimeValidParamId: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateTimeValidParamId },
          lastUpdateModeValidParamMask: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateModeValidParamMask },
          lastUpdateTimeValidParamMask: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateTimeValidParamMask },
          lastUpdateModeValidParamExpValue: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateModeValidParamExpValue },
          lastUpdateTimeValidParamExpValue: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateTimeValidParamExpValue },
          lastUpdateModeCollectInterval: { type: 'uoctet', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateModeCollectInterval },
          lastUpdateTimeCollectInterval: { type: 'time', value: stub.pus003HkPacket[i].pus003Packet.lastUpdateTimeCollectInterval },
        },
        lastUpdateTimeGenMode: { type: 'time', value: stub.pus003HkPacket[i].lastUpdateTimeGenMode },
        lastUpdateModeGenMode: { type: 'uoctet', value: stub.pus003HkPacket[i].lastUpdateModeGenMode },
      });
      
    }
  });
});
