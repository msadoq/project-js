// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus012Model');
const stub = require('./pus012Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus012Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus012Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      noOfParameterMonitoringDefinition: { type: 'uinteger', value: stub.noOfParameterMonitoringDefinition },
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      groundDate: { type: 'time', value: stub.groundDate },
      status: { type: 'uinteger', value: stub.status },
      lastUpdateModeServiceStatus: { type: 'uinteger', value: stub.lastUpdateModeServiceStatus },
      lastUpdateTimeServiceStatus: { type: 'string', value: stub.lastUpdateTimeServiceStatus },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus012ParameterMonitoringDefinition).toHaveLength(stub.pus012ParameterMonitoringDefinition.length);
    for (let i = 0; i < stub.pus012ParameterMonitoringDefinition.length; i += 1) {
      expect(decoded.pus012ParameterMonitoringDefinition[i]).toMatchObject({
        monitoringId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringId },
        monitoringIdLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].monitoringIdLabel },
        monitoringName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].monitoringName },
        parameterId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].parameterId },
        parameterName: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].parameterName },
        monitoringStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringStatus },
        protectionStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].protectionStatus },
        monitoringInterval: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringInterval },
        repetitionNumber: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].repetitionNumber },
        checkType: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].checkType },
        validityParameterId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterId },
        validityParameterName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterName },
        validityParameterMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterMask },
        parameterCurrentValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].parameterCurrentValue },
        validityParameterExpectedValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterExpectedValue },
        pus012MonitoringCheckPropertiesLow: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow === 'undefined')
          ? null
          : {
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.rid },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridLabel },
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionStatus },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionName },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.mask },
            value: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.value },
            lastUpdateModeRid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeRid },
            lastUpdateTimeRid: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeRid },
            lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeActionStatus },
            lastUpdateTimeActionStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeActionStatus },
            lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeRidStatus },
            lastUpdateTimeRidStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeRidStatus },
            lastUpdateModeMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeMask },
            lastUpdateTimeMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeMask },
            lastUpdateModeValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeValue },
            lastUpdateTimeValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeValue },
            actionTcApid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionTcApid },
            actionTcType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionTcType },
            actionTcSubType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionTcSubType },
            uniqueId: { type: 'ulong', symbol: `${stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.uniqueId}` },
          },
        pus012MonitoringCheckPropertiesHigh: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh === 'undefined')
          ? null
          : {
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.rid },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridLabel },
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionStatus },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionName },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.mask },
            value: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.value },
            lastUpdateModeRid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeRid },
            lastUpdateTimeRid: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRid },
            lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeActionStatus },
            lastUpdateTimeActionStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeActionStatus },
            lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeRidStatus },
            lastUpdateTimeRidStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRidStatus },
            lastUpdateModeMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeMask },
            lastUpdateTimeMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeMask },
            lastUpdateModeValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeValue },
            lastUpdateTimeValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeValue },
            actionTcApid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionTcApid },
            actionTcType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionTcType },
            actionTcSubType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionTcSubType },
            uniqueId: { type: 'ulong', symbol: `${stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.uniqueId}` },
          },
        pus012MonitoringCheckPropertiesExpected: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected === 'undefined')
          ? null
          : {
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.rid },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridLabel },
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionStatus },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionName },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.mask },
            value: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.value },
            lastUpdateModeRid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeRid },
            lastUpdateTimeRid: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRid },
            lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeActionStatus },
            lastUpdateTimeActionStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeActionStatus },
            lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeRidStatus },
            lastUpdateTimeRidStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRidStatus },
            lastUpdateModeMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeMask },
            lastUpdateTimeMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeMask },
            lastUpdateModeValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeValue },
            lastUpdateTimeValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeValue },
            actionTcApid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionTcApid },
            actionTcType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionTcType },
            actionTcSubType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionTcSubType },
            uniqueId: { type: 'ulong', symbol: `${stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.uniqueId}` },
          },
        isMonitoringIntervalSet: { type: 'boolean', value: stub.pus012ParameterMonitoringDefinition[i].isMonitoringIntervalSet },
        isRepetitionNumberSet: { type: 'boolean', value: stub.pus012ParameterMonitoringDefinition[i].isRepetitionNumberSet },
        lastUpdateModeMonId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeMonId },
        lastUpdateTimeMonId: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeMonId },
        lastUpdateModeParamId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeParamId },
        lastUpdateTimeParamId: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeParamId },
        lastUpdateModeValParamId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeValParamId },
        lastUpdateTimeValParamId: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeValParamId },
        lastUpdateModeParamCurrentValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeParamCurrentValue },
        lastUpdateTimeParamCurrentValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeParamCurrentValue },
        lastUpdateModeValParamExpectValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeValParamExpectValue },
        lastUpdateTimeValParamExpectValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeValParamExpectValue },
        lastUpdateModeValParamMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeValParamMask },
        lastUpdateTimeValParamMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeValParamMask },
        lastUpdateModeMonInterval: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeMonInterval },
        lastUpdateTimeMonInterval: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeMonInterval },
        lastUpdateModeRepetition: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeRepetition },
        lastUpdateTimeRepetition: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeRepetition },
        lastUpdateModeCheckType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeCheckType },
        lastUpdateTimeCheckTime: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeCheckTime },
        lastUpdateModeMonStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeMonStatus },
        lastUpdateTimeMonStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeMonStatus },
        lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeProtectionStatus },
        lastUpdateTimeProtectionStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeProtectionStatus },
        serviceApid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].serviceApidName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus012ParameterMonitoringDefinition[i].uniqueId}` },
      });
      
    }
  });
});
