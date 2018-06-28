// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus012ParameterMonitoringDefinition');
const stub = require('./pus012ParameterMonitoringDefinition.stub')();



describe('protobuf/isis/pusGroundModel/Pus012ParameterMonitoringDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012ParameterMonitoringDefinition.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus012ParameterMonitoringDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      monitoringId: { type: 'uinteger', value: stub.monitoringId },
      parameterId: { type: 'uinteger', value: stub.parameterId },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      parameterCurrentValue: { type: 'string', value: stub.parameterCurrentValue },
      validityParameterExpectedValue: { type: 'string', value: stub.validityParameterExpectedValue },
      monitoringInterval: { type: 'uinteger', value: stub.monitoringInterval },
      repetitionNumber: { type: 'uinteger', value: stub.repetitionNumber },
      checkType: { type: 'uinteger', value: stub.checkType },
      monitoringStatus: { type: 'uinteger', value: stub.monitoringStatus },
      pus012MonitoringCheckPropertiesLow: (typeof stub.pus012MonitoringCheckPropertiesLow === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.actionStatus },
          value: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.value },
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.rid },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.mask },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.actionName },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.ridLabel },
          lastUpdateModeRid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeRid },
          lastUpdateTimeRid: { type: 'time', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeRid },
          lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeActionStatus },
          lastUpdateTimeActionStatus: { type: 'time', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeActionStatus },
          lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeRidStatus },
          lastUpdateTimeRidStatus: { type: 'time', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeRidStatus },
          lastUpdateModeMask: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeMask },
          lastUpdateTimeMask: { type: 'time', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeMask },
          lastUpdateModeValue: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateModeValue },
          lastUpdateTimeValue: { type: 'time', value: stub.pus012MonitoringCheckPropertiesLow.lastUpdateTimeValue },
        },
      pus012MonitoringCheckPropertiesHigh: (typeof stub.pus012MonitoringCheckPropertiesHigh === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.actionStatus },
          value: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.value },
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.rid },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.mask },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.actionName },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.ridLabel },
          lastUpdateModeRid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeRid },
          lastUpdateTimeRid: { type: 'time', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRid },
          lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeActionStatus },
          lastUpdateTimeActionStatus: { type: 'time', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeActionStatus },
          lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeRidStatus },
          lastUpdateTimeRidStatus: { type: 'time', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRidStatus },
          lastUpdateModeMask: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeMask },
          lastUpdateTimeMask: { type: 'time', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeMask },
          lastUpdateModeValue: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateModeValue },
          lastUpdateTimeValue: { type: 'time', value: stub.pus012MonitoringCheckPropertiesHigh.lastUpdateTimeValue },
        },
      pus012MonitoringCheckPropertiesExpected: (typeof stub.pus012MonitoringCheckPropertiesExpected === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.actionStatus },
          value: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.value },
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.rid },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.mask },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.actionName },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.ridLabel },
          lastUpdateModeRid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeRid },
          lastUpdateTimeRid: { type: 'time', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRid },
          lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeActionStatus },
          lastUpdateTimeActionStatus: { type: 'time', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeActionStatus },
          lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeRidStatus },
          lastUpdateTimeRidStatus: { type: 'time', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRidStatus },
          lastUpdateModeMask: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeMask },
          lastUpdateTimeMask: { type: 'time', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeMask },
          lastUpdateModeValue: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateModeValue },
          lastUpdateTimeValue: { type: 'time', value: stub.pus012MonitoringCheckPropertiesExpected.lastUpdateTimeValue },
        },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      monitoringIdLabel: { type: 'string', value: stub.monitoringIdLabel },
      protectionStatus: { type: 'string', value: stub.protectionStatus },
      isMonitoringIntervalSet: { type: 'boolean', value: stub.isMonitoringIntervalSet },
      isRepetitionNumberSet: { type: 'boolean', value: stub.isRepetitionNumberSet },
      lastUpdateModeMonId: { type: 'uinteger', value: stub.lastUpdateModeMonId },
      lastUpdateTimeMonId: { type: 'time', value: stub.lastUpdateTimeMonId },
      lastUpdateModeParamId: { type: 'uinteger', value: stub.lastUpdateModeParamId },
      lastUpdateTimeParamId: { type: 'time', value: stub.lastUpdateTimeParamId },
      lastUpdateModeValParamId: { type: 'uinteger', value: stub.lastUpdateModeValParamId },
      lastUpdateTimeValParamId: { type: 'time', value: stub.lastUpdateTimeValParamId },
      lastUpdateModeParamCurrentValue: { type: 'uinteger', value: stub.lastUpdateModeParamCurrentValue },
      lastUpdateTimeParamCurrentValue: { type: 'time', value: stub.lastUpdateTimeParamCurrentValue },
      lastUpdateModeValParamExpectValue: { type: 'uinteger', value: stub.lastUpdateModeValParamExpectValue },
      lastUpdateTimeValParamExpectValue: { type: 'time', value: stub.lastUpdateTimeValParamExpectValue },
      lastUpdateModeValParamMask: { type: 'uinteger', value: stub.lastUpdateModeValParamMask },
      lastUpdateTimeValParamMask: { type: 'time', value: stub.lastUpdateTimeValParamMask },
      lastUpdateModeMonInterval: { type: 'uinteger', value: stub.lastUpdateModeMonInterval },
      lastUpdateTimeMonInterval: { type: 'time', value: stub.lastUpdateTimeMonInterval },
      lastUpdateModeRepetition: { type: 'uinteger', value: stub.lastUpdateModeRepetition },
      lastUpdateTimeRepetition: { type: 'time', value: stub.lastUpdateTimeRepetition },
      lastUpdateModeCheckType: { type: 'uinteger', value: stub.lastUpdateModeCheckType },
      lastUpdateTimeCheckTime: { type: 'time', value: stub.lastUpdateTimeCheckTime },
      lastUpdateModeMonStatus: { type: 'uinteger', value: stub.lastUpdateModeMonStatus },
      lastUpdateTimeMonStatus: { type: 'time', value: stub.lastUpdateTimeMonStatus },
      lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.lastUpdateModeProtectionStatus },
      lastUpdateTimeProtectionStatus: { type: 'time', value: stub.lastUpdateTimeProtectionStatus },
    });
    
  });
});
