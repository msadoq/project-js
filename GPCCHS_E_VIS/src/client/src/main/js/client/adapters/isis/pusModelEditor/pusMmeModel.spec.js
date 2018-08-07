// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusMmeModel');
const stub = require('./pusMmeModel.stub')();



describe('protobuf/isis/pusModelEditorMessages/PusMmeModel', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusMmeModel.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.PusMmeModel');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      status: { type: 'uinteger', value: stub.status },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      noHkPackets: { type: 'uinteger', value: stub.noHkPackets },
      noDiagPackets: { type: 'uinteger', value: stub.noDiagPackets },
    });
    expect(decoded.pusMmePacket).toHaveLength(stub.pusMmePacket.length);
    for (let i = 0; i < stub.pusMmePacket.length; i += 1) {
      expect(decoded.pusMmePacket[i]).toMatchObject({
        sid: { type: 'uinteger', value: stub.pusMmePacket[i].sid },
        validityParameterId: { type: 'uinteger', value: stub.pusMmePacket[i].validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pusMmePacket[i].validityParameterMask },
        validityParameterExpectedValue: { type: 'string', value: stub.pusMmePacket[i].validityParameterExpectedValue },
        collectionInterval: { type: 'string', value: stub.pusMmePacket[i].collectionInterval },
        status: { type: 'uinteger', value: stub.pusMmePacket[i].status },
        sidLabel: { type: 'string', value: stub.pusMmePacket[i].sidLabel },
        lastUpdateModeSid: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeSid },
        lastUpdateTimeSid: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeSid },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeStatus },
        lastUpdateModeValidParamId: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeValidParamId },
        lastUpdateTimeValidParamId: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeValidParamId },
        lastUpdateModeValidParamMask: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeValidParamMask },
        lastUpdateTimeValidParamMask: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeValidParamMask },
        lastUpdateModeValidParamExpValue: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeValidParamExpValue },
        lastUpdateTimeValidParamExpValue: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeValidParamExpValue },
        lastUpdateModeCollectInterval: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeCollectInterval },
        lastUpdateTimeCollectInterval: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeCollectInterval },
        packetName: { type: 'string', value: stub.pusMmePacket[i].packetName },
        validityParameterName: { type: 'string', value: stub.pusMmePacket[i].validityParameterName },
        packetApid: { type: 'uinteger', value: stub.pusMmePacket[i].packetApid },
        packetApidName: { type: 'string', value: stub.pusMmePacket[i].packetApidName },
        serviceApid: { type: 'uinteger', value: stub.pusMmePacket[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pusMmePacket[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pusMmePacket[i].uniqueId}` },
        generationMode: { type: 'string', value: stub.pusMmePacket[i].generationMode },
        lastUpdateTimeGenMode: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeGenMode },
        lastUpdateModeGenMode: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeGenMode },
        packetType: { type: 'string', value: stub.pusMmePacket[i].packetType },
        forwardingStatusTypeSubtype: { type: 'uinteger', value: stub.pusMmePacket[i].forwardingStatusTypeSubtype },
        lastUpdateModeFwdStatusTypeSubtype: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeFwdStatusTypeSubtype },
        lastUpdateTimeFwdStatusTypeSubtype: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeFwdStatusTypeSubtype },
        forwardingStatusRidSid: { type: 'uinteger', value: stub.pusMmePacket[i].forwardingStatusRidSid },
        lastUpdateModeFwdStatusTypeRidSid: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeFwdStatusTypeRidSid },
        lastUpdateTimeFwdStatusTypeRidSid: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeFwdStatusTypeRidSid },
        lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.pusMmePacket[i].lastUpdateModeSubSamplingRatio },
        lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.pusMmePacket[i].lastUpdateTimeSubSamplingRatio },
        subsamplingRatio: { type: 'uinteger', value: stub.pusMmePacket[i].subsamplingRatio },
      });
      expect(decoded.pusMmePacket[i].pusMmePacketStore).toHaveLength(stub.pusMmePacket[i].pusMmePacketStore.length);
      for (let ii = 0; ii < stub.pusMmePacket[i].pusMmePacketStore.length; ii += 1) {
        expect(decoded.pusMmePacket[i].pusMmePacketStore[ii]).toMatchObject({
          storeName: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketStore[ii].storeName },
          storeId: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketStore[ii].storeId },
          storeStatus: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketStore[ii].storeStatus },
          subSamplingRatio: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketStore[ii].subSamplingRatio },
          lastUpdateModeStoreId: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketStore[ii].lastUpdateModeStoreId },
          lastUpdateTimeStoreId: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketStore[ii].lastUpdateTimeStoreId },
          lastUpdateModeStoreStatus: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketStore[ii].lastUpdateModeStoreStatus },
          lastUpdateTimeStoreStatus: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketStore[ii].lastUpdateTimeStoreStatus },
          lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketStore[ii].lastUpdateModeSubSamplingRatio },
          lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketStore[ii].lastUpdateTimeSubSamplingRatio },
          uniqueId: { type: 'ulong', symbol: `${stub.pusMmePacket[i].pusMmePacketStore[ii].uniqueId}` },
        });
        
      }
      expect(decoded.pusMmePacket[i].pusMmePacketParameter).toHaveLength(stub.pusMmePacket[i].pusMmePacketParameter.length);
      for (let ii = 0; ii < stub.pusMmePacket[i].pusMmePacketParameter.length; ii += 1) {
        expect(decoded.pusMmePacket[i].pusMmePacketParameter[ii]).toMatchObject({
          parameterId: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].parameterId },
          parameterName: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].parameterName },
          parameterOrder: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].parameterOrder },
          parameterFilteredStatus: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].parameterFilteredStatus },
          uniqueId: { type: 'ulong', symbol: `${stub.pusMmePacket[i].pusMmePacketParameter[ii].uniqueId}` },
          lastUpdateModeParameterId: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].lastUpdateModeParameterId },
          lastUpdateTimeParameterId: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].lastUpdateTimeParameterId },
          lastUpdateModeFilteredStatus: { type: 'uinteger', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].lastUpdateModeFilteredStatus },
          lastUpdateTimeFilteredStatus: { type: 'string', value: stub.pusMmePacket[i].pusMmePacketParameter[ii].lastUpdateTimeFilteredStatus },
        });
        
      }
    }
  });
});
