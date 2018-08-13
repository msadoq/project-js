// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus142Model');
const stub = require('./pus142Model.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus142Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142Model.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus142Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      status: { type: 'uinteger', value: stub.status },
      lastUpdateModeServiceStatus: { type: 'uinteger', value: stub.lastUpdateModeServiceStatus },
      lastUpdateTimeServiceStatus: { type: 'string', value: stub.lastUpdateTimeServiceStatus },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
    });
    expect(decoded.pus142FunctionalMonitoring).toHaveLength(stub.pus142FunctionalMonitoring.length);
    for (let i = 0; i < stub.pus142FunctionalMonitoring.length; i += 1) {
      expect(decoded.pus142FunctionalMonitoring[i]).toMatchObject({
        fmonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].fmonId },
        fmonIdLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].fmonIdLabel },
        fmonName: { type: 'string', value: stub.pus142FunctionalMonitoring[i].fmonName },
        status: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].status },
        checkingStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].checkingStatus },
        protectionStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].protectionStatus },
        rid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].rid },
        ridLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].ridLabel },
        packetName: { type: 'string', value: stub.pus142FunctionalMonitoring[i].packetName },
        ridStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].ridStatus },
        validityParameterId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pus142FunctionalMonitoring[i].validityParameterMask },
        validityParameterExpectedValue: { type: 'string', value: stub.pus142FunctionalMonitoring[i].validityParameterExpectedValue },
        lastUpdateModeFMonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeFMonId },
        lastUpdateTimeFMonId: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeFMonId },
        lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeProtectionStatus },
        lastUpdateTimeProtectionStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeProtectionStatus },
        lastUpdateModeCheckingStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeCheckingStatus },
        lastUpdateTimeCheckingStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeCheckingStatus },
        lastUpdateModeStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeStatus },
        lastUpdateTimeStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeStatus },
        lastUpdateModeRid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeRid },
        lastUpdateTimeRid: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeRid },
        lastUpdateModeValidParamId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeValidParamId },
        lastUpdateTimeValidParamId: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeValidParamId },
        lastUpdateModeValidParamMask: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeValidParamMask },
        lastUpdateTimeValidParamMask: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeValidParamMask },
        lastUpdateModeValidParamExpectedValue: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeValidParamExpectedValue },
        lastUpdateTimeValidParamExpectedValue: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeValidParamExpectedValue },
        actionTcApid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].actionTcApid },
        actionTcType: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].actionTcType },
        actionTcSubType: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].actionTcSubType },
        actionStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].actionStatus },
        actionName: { type: 'string', value: stub.pus142FunctionalMonitoring[i].actionName },
        lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeActionStatus },
        lastUpdateTimeActionStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeActionStatus },
        lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].lastUpdateModeRidStatus },
        lastUpdateTimeRidStatus: { type: 'string', value: stub.pus142FunctionalMonitoring[i].lastUpdateTimeRidStatus },
        uniqueId: { type: 'ulong', symbol: `${stub.pus142FunctionalMonitoring[i].uniqueId}` },
        serviceApid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus142FunctionalMonitoring[i].serviceApidName },
      });
      expect(decoded.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition).toHaveLength(stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.length);
      for (let ii = 0; ii < stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.length; ii += 1) {
        expect(decoded.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii]).toMatchObject({
          paramMonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].paramMonId },
          uniqueId: { type: 'ulong', symbol: `${stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].uniqueId}` },
          serviceApid: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].serviceApid },
          serviceApidName: { type: 'string', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].serviceApidName },
          lastUpdateModeId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].lastUpdateModeId },
          lastUpdateTimeId: { type: 'string', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].lastUpdateTimeId },
          paramMonName: { type: 'string', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].paramMonName },
          fmonId: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].fmonId },
          fmonIdLabel: { type: 'string', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].fmonIdLabel },
          status: { type: 'uinteger', value: stub.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].status },
        });
        
      }
    }
  });
});
