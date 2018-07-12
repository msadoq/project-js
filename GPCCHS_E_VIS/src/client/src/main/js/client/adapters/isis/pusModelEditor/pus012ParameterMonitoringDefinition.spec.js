// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus012ParameterMonitoringDefinition');
const stub = require('./pus012ParameterMonitoringDefinition.stub')();



describe('protobuf/isis/pusModelEditor/Pus012ParameterMonitoringDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012ParameterMonitoringDefinition.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus012ParameterMonitoringDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      monitoringId: { type: 'uinteger', value: stub.monitoringId },
      monitoringIdLabel: { type: 'string', value: stub.monitoringIdLabel },
      monitoringName: { type: 'string', value: stub.monitoringName },
      parameterId: { type: 'uinteger', value: stub.parameterId },
      parameterName: { type: 'uinteger', value: stub.parameterName },
      monitoringStatus: { type: 'uinteger', value: stub.monitoringStatus },
      protectionStatus: { type: 'string', value: stub.protectionStatus },
      monitoringInterval: { type: 'uinteger', value: stub.monitoringInterval },
      repetitionNumber: { type: 'uinteger', value: stub.repetitionNumber },
      checkType: { type: 'string', value: stub.checkType },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterName: { type: 'string', value: stub.validityParameterName },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      parameterCurrentValue: { type: 'string', value: stub.parameterCurrentValue },
      validityParameterExpectedValue: { type: 'string', value: stub.validityParameterExpectedValue },
      pus012MonitoringCheckPropertiesLow: (typeof stub.pus012MonitoringCheckPropertiesLow === 'undefined')
        ? null
        : {
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.rid },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.ridLabel },
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.actionStatus },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.actionName },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.mask },
          value: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.value },
          lastUpdateModeRid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeRid },
          lastUpdateTimeRid: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeRid },
          lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeActionStatus },
          lastUpdateTimeActionStatus: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeActionStatus },
          lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeRidStatus },
          lastUpdateTimeRidStatus: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeRidStatus },
          lastUpdateModeMask: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeMask },
          lastUpdateTimeMask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeMask },
          lastUpdateModeValue: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeValue },
          lastUpdateTimeValue: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeValue },
          actionTcApid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.actionTcApid },
          actionTcType: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.actionTcType },
          actionTcSubType: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.actionTcSubType },
          uniqueId: { type: 'ulong', symbol: `${stub.pus012MonitoringCheckPropertiesLow.uniqueId}` },
        },
      pus012MonitoringCheckPropertiesHigh: (typeof stub.pus012MonitoringCheckPropertiesHigh === 'undefined')
        ? null
        : {
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.rid },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.ridLabel },
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.actionStatus },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.actionName },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.mask },
          value: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.value },
          lastUpdateModeRid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeRid },
          lastUpdateTimeRid: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRid },
          lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeActionStatus },
          lastUpdateTimeActionStatus: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeActionStatus },
          lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeRidStatus },
          lastUpdateTimeRidStatus: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRidStatus },
          lastUpdateModeMask: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeMask },
          lastUpdateTimeMask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeMask },
          lastUpdateModeValue: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeValue },
          lastUpdateTimeValue: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeValue },
          actionTcApid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.actionTcApid },
          actionTcType: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.actionTcType },
          actionTcSubType: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.actionTcSubType },
          uniqueId: { type: 'ulong', symbol: `${stub.pus012MonitoringCheckPropertiesHigh.uniqueId}` },
        },
      pus012MonitoringCheckPropertiesExpected: (typeof stub.pus012MonitoringCheckPropertiesExpected === 'undefined')
        ? null
        : {
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.rid },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.ridLabel },
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.actionStatus },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.actionName },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.mask },
          value: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.value },
          lastUpdateModeRid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeRid },
          lastUpdateTimeRid: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRid },
          lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeActionStatus },
          lastUpdateTimeActionStatus: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeActionStatus },
          lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeRidStatus },
          lastUpdateTimeRidStatus: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRidStatus },
          lastUpdateModeMask: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeMask },
          lastUpdateTimeMask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeMask },
          lastUpdateModeValue: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeValue },
          lastUpdateTimeValue: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeValue },
          actionTcApid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.actionTcApid },
          actionTcType: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.actionTcType },
          actionTcSubType: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.actionTcSubType },
          uniqueId: { type: 'ulong', symbol: `${stub.pus012MonitoringCheckPropertiesExpected.uniqueId}` },
        },
      isMonitoringIntervalSet: { type: 'boolean', value: stub.isMonitoringIntervalSet },
      isRepetitionNumberSet: { type: 'boolean', value: stub.isRepetitionNumberSet },
      lastUpdateModeMonId: { type: 'uinteger', value: stub.lastUpdateModeMonId },
      lastUpdateTimeMonId: { type: 'string', value: stub.lastUpdateTimeMonId },
      lastUpdateModeParamId: { type: 'uinteger', value: stub.lastUpdateModeParamId },
      lastUpdateTimeParamId: { type: 'string', value: stub.lastUpdateTimeParamId },
      lastUpdateModeValParamId: { type: 'uinteger', value: stub.lastUpdateModeValParamId },
      lastUpdateTimeValParamId: { type: 'string', value: stub.lastUpdateTimeValParamId },
      lastUpdateModeParamCurrentValue: { type: 'uinteger', value: stub.lastUpdateModeParamCurrentValue },
      lastUpdateTimeParamCurrentValue: { type: 'string', value: stub.lastUpdateTimeParamCurrentValue },
      lastUpdateModeValParamExpectValue: { type: 'uinteger', value: stub.lastUpdateModeValParamExpectValue },
      lastUpdateTimeValParamExpectValue: { type: 'string', value: stub.lastUpdateTimeValParamExpectValue },
      lastUpdateModeValParamMask: { type: 'uinteger', value: stub.lastUpdateModeValParamMask },
      lastUpdateTimeValParamMask: { type: 'string', value: stub.lastUpdateTimeValParamMask },
      lastUpdateModeMonInterval: { type: 'uinteger', value: stub.lastUpdateModeMonInterval },
      lastUpdateTimeMonInterval: { type: 'string', value: stub.lastUpdateTimeMonInterval },
      lastUpdateModeRepetition: { type: 'uinteger', value: stub.lastUpdateModeRepetition },
      lastUpdateTimeRepetition: { type: 'string', value: stub.lastUpdateTimeRepetition },
      lastUpdateModeCheckType: { type: 'uinteger', value: stub.lastUpdateModeCheckType },
      lastUpdateTimeCheckTime: { type: 'string', value: stub.lastUpdateTimeCheckTime },
      lastUpdateModeMonStatus: { type: 'uinteger', value: stub.lastUpdateModeMonStatus },
      lastUpdateTimeMonStatus: { type: 'string', value: stub.lastUpdateTimeMonStatus },
      lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.lastUpdateModeProtectionStatus },
      lastUpdateTimeProtectionStatus: { type: 'string', value: stub.lastUpdateTimeProtectionStatus },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
