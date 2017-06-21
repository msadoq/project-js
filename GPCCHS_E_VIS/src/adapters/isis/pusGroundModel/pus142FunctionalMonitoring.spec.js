// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus142FunctionalMonitoring');
const { getPus142FunctionalMonitoring } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus142FunctionalMonitoring', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142FunctionalMonitoring.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus142FunctionalMonitoring');
  const fixture = getPus142FunctionalMonitoring();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      fmonId: { type: 'uinteger', value: fixture.fmonId },
      protectionStatus: { type: 'uinteger', value: fixture.protectionStatus },
      status: { type: 'uinteger', value: fixture.status },
      checkingStatus: { type: 'uinteger', value: fixture.checkingStatus },
      rid: { type: 'uinteger', value: fixture.rid },
      validityParameterId: { type: 'uinteger', value: fixture.validityParameterId },
      validityParameterMask: { type: 'uinteger', value: fixture.validityParameterMask },
      validityParameterExpectedValue: { type: 'double', symbol: fixture.validityParameterExpectedValue.toString() },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      ridLabel: { type: 'string', value: fixture.ridLabel },
      fmonIdLabel: { type: 'string', value: fixture.fmonIdLabel },
    });
    
    json.pus142ParameterMonitoringDefinition.should.be.an('array').that.have.lengthOf(fixture.pus142ParameterMonitoringDefinition.length);
    for (let i = 0; i < fixture.pus142ParameterMonitoringDefinition.length; i += 1) {
      json.pus142ParameterMonitoringDefinition[i].should.be.an('object').that.have.properties({
        paramMonId: { type: 'uinteger', value: fixture.pus142ParameterMonitoringDefinition[i].paramMonId },
      });
      
    }
  });
});
