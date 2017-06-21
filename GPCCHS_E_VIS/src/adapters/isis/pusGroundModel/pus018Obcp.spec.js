// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus018Obcp');
const { getPus018Obcp } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus018Obcp', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018Obcp.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus018Obcp');
  const fixture = getPus018Obcp();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      id: { type: 'uinteger', value: fixture.id },
      status: { type: 'uinteger', value: fixture.status },
      stepId: { type: 'uinteger', value: fixture.stepId },
      partitionId: { type: 'uinteger', value: fixture.partitionId },
      observabilityLevel: { type: 'uinteger', value: fixture.observabilityLevel },
      priority: { type: 'uinteger', value: fixture.priority },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    
    json.pus18Parameter.should.be.an('array').that.have.lengthOf(fixture.pus18Parameter.length);
    for (let i = 0; i < fixture.pus18Parameter.length; i += 1) {
      json.pus18Parameter[i].should.be.an('object').that.have.properties({
        parameterId: { type: 'uinteger', value: fixture.pus18Parameter[i].parameterId },
        parameterName: { type: 'string', value: fixture.pus18Parameter[i].parameterName },
        value: { type: 'double', symbol: fixture.pus18Parameter[i].value.toString() },
      });
      
    }
  });
});
