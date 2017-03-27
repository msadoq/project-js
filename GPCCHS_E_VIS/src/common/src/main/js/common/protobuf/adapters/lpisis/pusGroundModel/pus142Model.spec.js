// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/pusGroundModel/Pus142Model', () => {
  const fixture = stubData.getPus142Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus142Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus142Model', buffer);
    json.should.be.an('object').that.have.properties({
      serviceStatus: { type: 'uinteger', value: fixture.serviceStatus },
      noOfFunctionalMonitoring: { type: 'uinteger', value: fixture.noOfFunctionalMonitoring },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus142FunctionalMonitoring.should.be.an('array').that.have.lengthOf(fixture.pus142FunctionalMonitoring.length);
    for (let i = 0; i < fixture.pus142FunctionalMonitoring.length; i += 1) {
      json.pus142FunctionalMonitoring[i].should.be.an('object').that.have.properties({
        fmonId: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].fmonId },
        protectionStatus: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].protectionStatus },
        status: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].status },
        checkingStatus: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].checkingStatus },
        rid: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].rid },
        validityParameterId: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].validityParameterId },
        validityParameterMask: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].validityParameterMask },
        validityParameterExpectedValue: { type: 'double', value: fixture.pus142FunctionalMonitoring[i].validityParameterExpectedValue },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus142FunctionalMonitoring[i].pusElement.lastUpdateTime },
        },
      });
      json.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.should.be.an('array').that.have.lengthOf(fixture.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.length);
      for (let ii = 0; ii < fixture.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition.length; ii += 1) {
        json.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].should.be.an('object').that.have.properties({
          paramMonId: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].pus142ParameterMonitoringDefinition[ii].paramMonId },
        });
        
      }
    }
  });
});

