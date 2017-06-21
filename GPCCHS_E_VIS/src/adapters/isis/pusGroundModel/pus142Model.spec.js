// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus142Model');
const { getPus142Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus142Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus142Model');
  const fixture = getPus142Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      serviceStatus: { type: 'uinteger', value: fixture.serviceStatus },
      noOfFunctionalMonitoring: { type: 'uinteger', value: fixture.noOfFunctionalMonitoring },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
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
        validityParameterExpectedValue: { type: 'double', symbol: fixture.pus142FunctionalMonitoring[i].validityParameterExpectedValue.toString() },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus142FunctionalMonitoring[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus142FunctionalMonitoring[i].pusElement.lastUpdateTime },
        },
        ridLabel: { type: 'string', value: fixture.pus142FunctionalMonitoring[i].ridLabel },
        fmonIdLabel: { type: 'string', value: fixture.pus142FunctionalMonitoring[i].fmonIdLabel },
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
