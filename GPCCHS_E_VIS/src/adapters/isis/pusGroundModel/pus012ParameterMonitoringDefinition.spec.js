// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus012ParameterMonitoringDefinition');
const { getPus012ParameterMonitoringDefinition } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus012ParameterMonitoringDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012ParameterMonitoringDefinition.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus012ParameterMonitoringDefinition');
  const fixture = getPus012ParameterMonitoringDefinition();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      monitoringId: { type: 'uinteger', value: fixture.monitoringId },
      parameterId: { type: 'uinteger', value: fixture.parameterId },
      validityParameterId: { type: 'uinteger', value: fixture.validityParameterId },
      validityParameterMask: { type: 'string', value: fixture.validityParameterMask },
      parameterCurrentValue: { type: 'double', symbol: fixture.parameterCurrentValue.toString() },
      validityParameterExpectedValue: { type: 'double', symbol: fixture.validityParameterExpectedValue.toString() },
      monitoringInterval: { type: 'uinteger', value: fixture.monitoringInterval },
      repetitionNumber: { type: 'uinteger', value: fixture.repetitionNumber },
      checkType: { type: 'uinteger', value: fixture.checkType },
      monitoringStatus: { type: 'uinteger', value: fixture.monitoringStatus },
      pus012MonitoringCheckPropertiesLow: (typeof fixture.pus012MonitoringCheckPropertiesLow === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesLow.ridStatus },
          actionStatus: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesLow.actionStatus },
          value: { type: 'double', symbol: fixture.pus012MonitoringCheckPropertiesLow.value.toString() },
          rid: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesLow.rid },
          mask: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesLow.mask },
          actionName: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesLow.actionName },
          ridLabel: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesLow.ridLabel },
        },
      pus012MonitoringCheckPropertiesHigh: (typeof fixture.pus012MonitoringCheckPropertiesHigh === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesHigh.ridStatus },
          actionStatus: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesHigh.actionStatus },
          value: { type: 'double', symbol: fixture.pus012MonitoringCheckPropertiesHigh.value.toString() },
          rid: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesHigh.rid },
          mask: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesHigh.mask },
          actionName: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesHigh.actionName },
          ridLabel: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesHigh.ridLabel },
        },
      pus012MonitoringCheckPropertiesExpected: (typeof fixture.pus012MonitoringCheckPropertiesExpected === 'undefined')
        ? null
        : {
          ridStatus: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesExpected.ridStatus },
          actionStatus: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesExpected.actionStatus },
          value: { type: 'double', symbol: fixture.pus012MonitoringCheckPropertiesExpected.value.toString() },
          rid: { type: 'uinteger', value: fixture.pus012MonitoringCheckPropertiesExpected.rid },
          mask: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesExpected.mask },
          actionName: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesExpected.actionName },
          ridLabel: { type: 'string', value: fixture.pus012MonitoringCheckPropertiesExpected.ridLabel },
        },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      monitoringIdLabel: { type: 'string', value: fixture.monitoringIdLabel },
    });
    
    
  });
});
