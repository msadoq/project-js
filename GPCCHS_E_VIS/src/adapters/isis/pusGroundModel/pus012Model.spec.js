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
    });
    expect(decoded.pus012ParameterMonitoringDefinition).toHaveLength(stub.pus012ParameterMonitoringDefinition.length);
    for (let i = 0; i < stub.pus012ParameterMonitoringDefinition.length; i += 1) {
      expect(decoded.pus012ParameterMonitoringDefinition[i]).toMatchObject({
        monitoringId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringId },
        parameterId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].parameterId },
        validityParameterId: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].validityParameterMask },
        parameterCurrentValue: { type: 'double', symbol: stub.pus012ParameterMonitoringDefinition[i].parameterCurrentValue.toString() },
        validityParameterExpectedValue: { type: 'double', symbol: stub.pus012ParameterMonitoringDefinition[i].validityParameterExpectedValue.toString() },
        monitoringInterval: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringInterval },
        repetitionNumber: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].repetitionNumber },
        checkType: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].checkType },
        monitoringStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].monitoringStatus },
        pus012MonitoringCheckPropertiesLow: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionStatus },
            value: { type: 'double', symbol: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.value.toString() },
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.rid },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.mask },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionName },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridLabel },
          },
        pus012MonitoringCheckPropertiesHigh: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionStatus },
            value: { type: 'double', symbol: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.value.toString() },
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.rid },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.mask },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionName },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridLabel },
          },
        pus012MonitoringCheckPropertiesExpected: (typeof stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridStatus },
            actionStatus: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionStatus },
            value: { type: 'double', symbol: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.value.toString() },
            rid: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.rid },
            mask: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.mask },
            actionName: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionName },
            ridLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridLabel },
          },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateTime },
        },
        monitoringIdLabel: { type: 'string', value: stub.pus012ParameterMonitoringDefinition[i].monitoringIdLabel },
      });
      
    }
  });
});
