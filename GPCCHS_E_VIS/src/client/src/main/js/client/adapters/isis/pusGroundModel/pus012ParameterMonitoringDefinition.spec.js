// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
      parameterCurrentValue: { type: 'double', symbol: stub.parameterCurrentValue.toString() },
      validityParameterExpectedValue: { type: 'double', symbol: stub.validityParameterExpectedValue.toString() },
      monitoringInterval: { type: 'uinteger', value: stub.monitoringInterval },
      repetitionNumber: { type: 'uinteger', value: stub.repetitionNumber },
      checkType: { type: 'uinteger', value: stub.checkType },
      monitoringStatus: { type: 'uinteger', value: stub.monitoringStatus },
      pus012MonitoringCheckPropertiesLow: (typeof stub.pus012MonitoringCheckPropertiesLow === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.actionStatus },
          value: { type: 'double', symbol: stub.pus012MonitoringCheckPropertiesLow.value.toString() },
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesLow.rid },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.mask },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.actionName },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesLow.ridLabel },
        },
      pus012MonitoringCheckPropertiesHigh: (typeof stub.pus012MonitoringCheckPropertiesHigh === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.actionStatus },
          value: { type: 'double', symbol: stub.pus012MonitoringCheckPropertiesHigh.value.toString() },
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesHigh.rid },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.mask },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.actionName },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesHigh.ridLabel },
        },
      pus012MonitoringCheckPropertiesExpected: (typeof stub.pus012MonitoringCheckPropertiesExpected === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.ridStatus },
          actionStatus: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.actionStatus },
          value: { type: 'double', symbol: stub.pus012MonitoringCheckPropertiesExpected.value.toString() },
          rid: { type: 'uinteger', value: stub.pus012MonitoringCheckPropertiesExpected.rid },
          mask: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.mask },
          actionName: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.actionName },
          ridLabel: { type: 'string', value: stub.pus012MonitoringCheckPropertiesExpected.ridLabel },
        },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      monitoringIdLabel: { type: 'string', value: stub.monitoringIdLabel },
    });
    
  });
});
