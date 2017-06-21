// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus012Model');
const { getPus012Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus012Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus012Model');
  const fixture = getPus012Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      noOfParameterMonitoringDefinition: { type: 'uinteger', value: fixture.noOfParameterMonitoringDefinition },
      serviceStatus: { type: 'uinteger', value: fixture.serviceStatus },
      groundDate: { type: 'time', value: fixture.groundDate },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
    });
    
    json.pus012ParameterMonitoringDefinition.should.be.an('array').that.have.lengthOf(fixture.pus012ParameterMonitoringDefinition.length);
    for (let i = 0; i < fixture.pus012ParameterMonitoringDefinition.length; i += 1) {
      json.pus012ParameterMonitoringDefinition[i].should.be.an('object').that.have.properties({
        monitoringId: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringId },
        parameterId: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].parameterId },
        validityParameterId: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].validityParameterId },
        validityParameterMask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].validityParameterMask },
        parameterCurrentValue: { type: 'double', symbol: fixture.pus012ParameterMonitoringDefinition[i].parameterCurrentValue.toString() },
        validityParameterExpectedValue: { type: 'double', symbol: fixture.pus012ParameterMonitoringDefinition[i].validityParameterExpectedValue.toString() },
        monitoringInterval: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringInterval },
        repetitionNumber: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].repetitionNumber },
        checkType: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].checkType },
        monitoringStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringStatus },
        pus012MonitoringCheckPropertiesLow: (typeof fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridStatus },
            actionStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionStatus },
            value: { type: 'double', symbol: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.value.toString() },
            rid: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.rid },
            mask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.mask },
            actionName: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionName },
            ridLabel: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridLabel },
          },
        pus012MonitoringCheckPropertiesHigh: (typeof fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridStatus },
            actionStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionStatus },
            value: { type: 'double', symbol: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.value.toString() },
            rid: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.rid },
            mask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.mask },
            actionName: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionName },
            ridLabel: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridLabel },
          },
        pus012MonitoringCheckPropertiesExpected: (typeof fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected === 'undefined')
          ? null
          : {
            ridStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridStatus },
            actionStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionStatus },
            value: { type: 'double', symbol: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.value.toString() },
            rid: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.rid },
            mask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.mask },
            actionName: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionName },
            ridLabel: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridLabel },
          },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateTime },
        },
        monitoringIdLabel: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringIdLabel },
      });
      
    }
  });
});
