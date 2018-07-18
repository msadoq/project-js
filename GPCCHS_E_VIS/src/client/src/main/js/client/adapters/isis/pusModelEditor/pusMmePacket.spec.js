// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusMmePacket');
const stub = require('./pusMmePacket.stub')();



describe('protobuf/isis/pusModelEditor/PusMmePacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusMmePacket.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.PusMmePacket');
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
      collectionInterval: { type: 'string', value: stub.collectionInterval },
      status: { type: 'uinteger', value: stub.status },
      sidLabel: { type: 'string', value: stub.sidLabel },
      lastUpdateModeSid: { type: 'uinteger', value: stub.lastUpdateModeSid },
      lastUpdateTimeSid: { type: 'string', value: stub.lastUpdateTimeSid },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'string', value: stub.lastUpdateTimeStatus },
      lastUpdateModeValidParamId: { type: 'uinteger', value: stub.lastUpdateModeValidParamId },
      lastUpdateTimeValidParamId: { type: 'string', value: stub.lastUpdateTimeValidParamId },
      lastUpdateModeValidParamMask: { type: 'uinteger', value: stub.lastUpdateModeValidParamMask },
      lastUpdateTimeValidParamMask: { type: 'string', value: stub.lastUpdateTimeValidParamMask },
      lastUpdateModeValidParamExpValue: { type: 'uinteger', value: stub.lastUpdateModeValidParamExpValue },
      lastUpdateTimeValidParamExpValue: { type: 'string', value: stub.lastUpdateTimeValidParamExpValue },
      lastUpdateModeCollectInterval: { type: 'uinteger', value: stub.lastUpdateModeCollectInterval },
      lastUpdateTimeCollectInterval: { type: 'string', value: stub.lastUpdateTimeCollectInterval },
      packetName: { type: 'string', value: stub.packetName },
      validityParameterName: { type: 'string', value: stub.validityParameterName },
      packetApid: { type: 'uinteger', value: stub.packetApid },
      packetApidName: { type: 'string', value: stub.packetApidName },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      generationMode: { type: 'string', value: stub.generationMode },
      lastUpdateTimeGenMode: { type: 'string', value: stub.lastUpdateTimeGenMode },
      lastUpdateModeGenMode: { type: 'uinteger', value: stub.lastUpdateModeGenMode },
      packetType: { type: 'string', value: stub.packetType },
      forwardingStatusTypeSubtype: { type: 'uinteger', value: stub.forwardingStatusTypeSubtype },
      lastUpdateModeFwdStatusTypeSubtype: { type: 'uinteger', value: stub.lastUpdateModeFwdStatusTypeSubtype },
      lastUpdateTimeFwdStatusTypeSubtype: { type: 'string', value: stub.lastUpdateTimeFwdStatusTypeSubtype },
      forwardingStatusRidSid: { type: 'uinteger', value: stub.forwardingStatusRidSid },
      lastUpdateModeFwdStatusTypeRidSid: { type: 'uinteger', value: stub.lastUpdateModeFwdStatusTypeRidSid },
      lastUpdateTimeFwdStatusTypeRidSid: { type: 'string', value: stub.lastUpdateTimeFwdStatusTypeRidSid },
      lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.lastUpdateModeSubSamplingRatio },
      lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.lastUpdateTimeSubSamplingRatio },
      subsamplingRatio: { type: 'uinteger', value: stub.subsamplingRatio },
    });
    expect(decoded.pusMmePacketStore).toHaveLength(stub.pusMmePacketStore.length);
    for (let i = 0; i < stub.pusMmePacketStore.length; i += 1) {
      expect(decoded.pusMmePacketStore[i]).toMatchObject({
        storeName: { type: 'string', value: stub.pusMmePacketStore[i].storeName },
        storeId: { type: 'uinteger', value: stub.pusMmePacketStore[i].storeId },
        storeStatus: { type: 'uinteger', value: stub.pusMmePacketStore[i].storeStatus },
        subSamplingRatio: { type: 'uinteger', value: stub.pusMmePacketStore[i].subSamplingRatio },
        lastUpdateModeStoreId: { type: 'uinteger', value: stub.pusMmePacketStore[i].lastUpdateModeStoreId },
        lastUpdateTimeStoreId: { type: 'string', value: stub.pusMmePacketStore[i].lastUpdateTimeStoreId },
        lastUpdateModeStoreStatus: { type: 'uinteger', value: stub.pusMmePacketStore[i].lastUpdateModeStoreStatus },
        lastUpdateTimeStoreStatus: { type: 'string', value: stub.pusMmePacketStore[i].lastUpdateTimeStoreStatus },
        lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.pusMmePacketStore[i].lastUpdateModeSubSamplingRatio },
        lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.pusMmePacketStore[i].lastUpdateTimeSubSamplingRatio },
        uniqueId: { type: 'ulong', symbol: `${stub.pusMmePacketStore[i].uniqueId}` },
      });
      
    }
    expect(decoded.pusMmePacketParameter).toHaveLength(stub.pusMmePacketParameter.length);
    for (let i = 0; i < stub.pusMmePacketParameter.length; i += 1) {
      expect(decoded.pusMmePacketParameter[i]).toMatchObject({
        parameterId: { type: 'uinteger', value: stub.pusMmePacketParameter[i].parameterId },
        parameterName: { type: 'string', value: stub.pusMmePacketParameter[i].parameterName },
        parameterOrder: { type: 'uinteger', value: stub.pusMmePacketParameter[i].parameterOrder },
        parameterFilteredStatus: { type: 'string', value: stub.pusMmePacketParameter[i].parameterFilteredStatus },
        uniqueId: { type: 'ulong', symbol: `${stub.pusMmePacketParameter[i].uniqueId}` },
        lastUpdateModeStoreId: { type: 'uinteger', value: stub.pusMmePacketParameter[i].lastUpdateModeStoreId },
        lastUpdateTimeStoreId: { type: 'string', value: stub.pusMmePacketParameter[i].lastUpdateTimeStoreId },
        lastUpdateModeFilteredStatus: { type: 'uinteger', value: stub.pusMmePacketParameter[i].lastUpdateModeFilteredStatus },
        lastUpdateTimeFilteredStatus: { type: 'string', value: stub.pusMmePacketParameter[i].lastUpdateTimeFilteredStatus },
      });
      
    }
  });
});
