// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus142FunctionalMonitoring');
const stub = require('./pus142FunctionalMonitoring.stub')();



describe('protobuf/isis/pusModelEditor/Pus142FunctionalMonitoring', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142FunctionalMonitoring.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus142FunctionalMonitoring');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      fmonId: { type: 'uinteger', value: stub.fmonId },
      fmonIdLabel: { type: 'string', value: stub.fmonIdLabel },
      fmonName: { type: 'string', value: stub.fmonName },
      status: { type: 'uinteger', value: stub.status },
      checkingStatus: { type: 'string', value: stub.checkingStatus },
      protectionStatus: { type: 'string', value: stub.protectionStatus },
      rid: { type: 'uinteger', value: stub.rid },
      ridLabel: { type: 'string', value: stub.ridLabel },
      packetName: { type: 'string', value: stub.packetName },
      ridStatus: { type: 'uinteger', value: stub.ridStatus },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      validityParameterExpectedValue: { type: 'string', value: stub.validityParameterExpectedValue },
      lastUpdateModeFMonId: { type: 'uinteger', value: stub.lastUpdateModeFMonId },
      lastUpdateTimeFMonId: { type: 'string', value: stub.lastUpdateTimeFMonId },
      lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.lastUpdateModeProtectionStatus },
      lastUpdateTimeProtectionStatus: { type: 'string', value: stub.lastUpdateTimeProtectionStatus },
      lastUpdateModeCheckingStatus: { type: 'uinteger', value: stub.lastUpdateModeCheckingStatus },
      lastUpdateTimeCheckingStatus: { type: 'string', value: stub.lastUpdateTimeCheckingStatus },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'string', value: stub.lastUpdateTimeStatus },
      lastUpdateModeRid: { type: 'uinteger', value: stub.lastUpdateModeRid },
      lastUpdateTimeRid: { type: 'string', value: stub.lastUpdateTimeRid },
      lastUpdateModeValidParamId: { type: 'uinteger', value: stub.lastUpdateModeValidParamId },
      lastUpdateTimeValidParamId: { type: 'string', value: stub.lastUpdateTimeValidParamId },
      lastUpdateModeValidParamMask: { type: 'uinteger', value: stub.lastUpdateModeValidParamMask },
      lastUpdateTimeValidParamMask: { type: 'string', value: stub.lastUpdateTimeValidParamMask },
      lastUpdateModeValidParamExpectedValue: { type: 'uinteger', value: stub.lastUpdateModeValidParamExpectedValue },
      lastUpdateTimeValidParamExpectedValue: { type: 'string', value: stub.lastUpdateTimeValidParamExpectedValue },
      actionTcApid: { type: 'uinteger', value: stub.actionTcApid },
      actionTcType: { type: 'uinteger', value: stub.actionTcType },
      actionTcSubType: { type: 'uinteger', value: stub.actionTcSubType },
      actionStatus: { type: 'uinteger', value: stub.actionStatus },
      actionName: { type: 'string', value: stub.actionName },
      lastUpdateModeActionStatus: { type: 'uinteger', value: stub.lastUpdateModeActionStatus },
      lastUpdateTimeActionStatus: { type: 'string', value: stub.lastUpdateTimeActionStatus },
      lastUpdateModeRidStatus: { type: 'uinteger', value: stub.lastUpdateModeRidStatus },
      lastUpdateTimeRidStatus: { type: 'string', value: stub.lastUpdateTimeRidStatus },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
    });
    expect(decoded.pus142ParameterMonitoringDefinition).toHaveLength(stub.pus142ParameterMonitoringDefinition.length);
    for (let i = 0; i < stub.pus142ParameterMonitoringDefinition.length; i += 1) {
      expect(decoded.pus142ParameterMonitoringDefinition[i]).toMatchObject({
        paramMonId: { type: 'uinteger', value: stub.pus142ParameterMonitoringDefinition[i].paramMonId },
        uniqueId: { type: 'ulong', symbol: `${stub.pus142ParameterMonitoringDefinition[i].uniqueId}` },
        serviceApid: { type: 'uinteger', value: stub.pus142ParameterMonitoringDefinition[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus142ParameterMonitoringDefinition[i].serviceApidName },
        lastUpdateModeId: { type: 'uinteger', value: stub.pus142ParameterMonitoringDefinition[i].lastUpdateModeId },
        lastUpdateTimeId: { type: 'string', value: stub.pus142ParameterMonitoringDefinition[i].lastUpdateTimeId },
        paramMonName: { type: 'string', value: stub.pus142ParameterMonitoringDefinition[i].paramMonName },
        fmonId: { type: 'uinteger', value: stub.pus142ParameterMonitoringDefinition[i].fmonId },
      });
      
    }
  });
});
