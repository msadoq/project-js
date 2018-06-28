// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus012Model');
const stub = require('./pus012Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus012Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus012Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      noOfParameterMonitoringDefinition: { type: 'uinteger', value: stub.noOfParameterMonitoringDefinition },
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      groundDate: { type: 'time', value: stub.groundDate },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
      lastUpdateModeServiceStatus: { type: 'uinteger', value: stub.lastUpdateModeServiceStatus },
      lastUpdateTimeServiceStatus: { type: 'time', value: stub.lastUpdateTimeServiceStatus },
    });
    expect(decoded.pus012ParameterMonitoringDefinition).toHaveLength(stub.pus012ParameterMonitoringDefinition.length);
    for (let i = 0; i < stub.pus012ParameterMonitoringDefinition.length; i += 1) {
      expect(decoded.pus012ParameterMonitoringDefinition[i]).toMatchObject({
        monitoringId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringId },
        parameterId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].parameterId },
        validityParameterId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterMask },
        parameterCurrentValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].parameterCurrentValue },
        validityParameterExpectedValue: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterExpectedValue },
        monitoringInterval: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringInterval },
        repetitionNumber: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].repetitionNumber },
        checkType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].checkType },
        monitoringStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringStatus },
        pus012MonitoringCheckPropertiesLow: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionStatus },
            value: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.value },
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.rid },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.mask },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionName },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridLabel },
            lastUpdateModeRid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeRid },
            lastUpdateTimeRid: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeRid },
            lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeActionStatus },
            lastUpdateTimeActionStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeActionStatus },
            lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeRidStatus },
            lastUpdateTimeRidStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeRidStatus },
            lastUpdateModeMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeMask },
            lastUpdateTimeMask: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeMask },
            lastUpdateModeValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateModeValue },
            lastUpdateTimeValue: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.lastUpdateTimeValue },
          },
        pus012MonitoringCheckPropertiesHigh: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionStatus },
            value: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.value },
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.rid },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.mask },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionName },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridLabel },
            lastUpdateModeRid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeRid },
            lastUpdateTimeRid: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRid },
            lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeActionStatus },
            lastUpdateTimeActionStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeActionStatus },
            lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeRidStatus },
            lastUpdateTimeRidStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeRidStatus },
            lastUpdateModeMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeMask },
            lastUpdateTimeMask: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeMask },
            lastUpdateModeValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateModeValue },
            lastUpdateTimeValue: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.lastUpdateTimeValue },
          },
        pus012MonitoringCheckPropertiesExpected: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionStatus },
            value: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.value },
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.rid },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.mask },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionName },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridLabel },
            lastUpdateModeRid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeRid },
            lastUpdateTimeRid: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRid },
            lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeActionStatus },
            lastUpdateTimeActionStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeActionStatus },
            lastUpdateModeRidStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeRidStatus },
            lastUpdateTimeRidStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeRidStatus },
            lastUpdateModeMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeMask },
            lastUpdateTimeMask: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeMask },
            lastUpdateModeValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateModeValue },
            lastUpdateTimeValue: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.lastUpdateTimeValue },
          },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateTime },
        },
        monitoringIdLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].monitoringIdLabel },
        protectionStatus: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].protectionStatus },
        isMonitoringIntervalSet: { type: 'boolean', value: stub.pus012ParameterMonitoringDefinition[i].isMonitoringIntervalSet },
        isRepetitionNumberSet: { type: 'boolean', value: stub.pus012ParameterMonitoringDefinition[i].isRepetitionNumberSet },
        lastUpdateModeMonId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeMonId },
        lastUpdateTimeMonId: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeMonId },
        lastUpdateModeParamId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeParamId },
        lastUpdateTimeParamId: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeParamId },
        lastUpdateModeValParamId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeValParamId },
        lastUpdateTimeValParamId: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeValParamId },
        lastUpdateModeParamCurrentValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeParamCurrentValue },
        lastUpdateTimeParamCurrentValue: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeParamCurrentValue },
        lastUpdateModeValParamExpectValue: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeValParamExpectValue },
        lastUpdateTimeValParamExpectValue: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeValParamExpectValue },
        lastUpdateModeValParamMask: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeValParamMask },
        lastUpdateTimeValParamMask: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeValParamMask },
        lastUpdateModeMonInterval: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeMonInterval },
        lastUpdateTimeMonInterval: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeMonInterval },
        lastUpdateModeRepetition: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeRepetition },
        lastUpdateTimeRepetition: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeRepetition },
        lastUpdateModeCheckType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeCheckType },
        lastUpdateTimeCheckTime: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeCheckTime },
        lastUpdateModeMonStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeMonStatus },
        lastUpdateTimeMonStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeMonStatus },
        lastUpdateModeProtectionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateModeProtectionStatus },
        lastUpdateTimeProtectionStatus: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].lastUpdateTimeProtectionStatus },
      });
      
    }
  });
});
