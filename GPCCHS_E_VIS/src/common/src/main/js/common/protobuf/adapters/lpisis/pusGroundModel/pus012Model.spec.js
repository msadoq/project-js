// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/pusGroundModel/Pus012Model', () => {
  const fixture = stubData.getPus012Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus012Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus012Model', buffer);
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      noOfParameterMonitoringDefinition: { type: 'uinteger', value: fixture.noOfParameterMonitoringDefinition },
      serviceStatus: { type: 'uinteger', value: fixture.serviceStatus },
      groundDate: { type: 'time', value: fixture.groundDate },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus012ParameterMonitoringDefinition.should.be.an('array').that.have.lengthOf(fixture.pus012ParameterMonitoringDefinition.length);
    for (let i = 0; i < fixture.pus012ParameterMonitoringDefinition.length; i += 1) {
      json.pus012ParameterMonitoringDefinition[i].should.be.an('object').that.have.properties({
        monitoringId: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringId },
        parameterId: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].parameterId },
        validityParameterId: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].validityParameterId },
        validityParameterMask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].validityParameterMask },
        parameterCurrentValue: { type: 'double', value: fixture.pus012ParameterMonitoringDefinition[i].parameterCurrentValue },
        validityParameterExpectedValue: { type: 'double', value: fixture.pus012ParameterMonitoringDefinition[i].validityParameterExpectedValue },
        monitoringInterval: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringInterval },
        repetitionNumber: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].repetitionNumber },
        checkType: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].checkType },
        monitoringStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].monitoringStatus },
        pus012MonitoringCheckPropertiesLow: (typeof fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow === 'undefined') 
          ? null 
          : {
            ridStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.ridStatus },
            actionStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionStatus },
            value: { type: 'double', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.value },
            rid: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.rid },
            mask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.mask },
            actionName: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesLow.actionName },
          },
        pus012MonitoringCheckPropertiesHigh: (typeof fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh === 'undefined') 
          ? null 
          : {
            ridStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.ridStatus },
            actionStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionStatus },
            value: { type: 'double', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.value },
            rid: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.rid },
            mask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.mask },
            actionName: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesHigh.actionName },
          },
        pus012MonitoringCheckPropertiesExpected: (typeof fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected === 'undefined') 
          ? null 
          : {
            ridStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.ridStatus },
            actionStatus: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionStatus },
            value: { type: 'double', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.value },
            rid: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.rid },
            mask: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.mask },
            actionName: { type: 'string', value: fixture.pus012ParameterMonitoringDefinition[i].pus012MonitoringCheckPropertiesExpected.actionName },
          },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus012ParameterMonitoringDefinition[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});

