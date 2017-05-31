// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus018Model', () => {
  const fixture = stubData.getPus018Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus018Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus018Model', buffer);
    json.should.be.an('object').that.have.properties({
      engineStatus: { type: 'uinteger', value: fixture.engineStatus },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOBCPs: { type: 'uinteger', value: fixture.noOBCPs },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus018Obcp.should.be.an('array').that.have.lengthOf(fixture.pus018Obcp.length);
    for (let i = 0; i < fixture.pus018Obcp.length; i += 1) {
      json.pus018Obcp[i].should.be.an('object').that.have.properties({
        id: { type: 'uinteger', value: fixture.pus018Obcp[i].id },
        status: { type: 'uinteger', value: fixture.pus018Obcp[i].status },
        stepId: { type: 'uinteger', value: fixture.pus018Obcp[i].stepId },
        partitionId: { type: 'uinteger', value: fixture.pus018Obcp[i].partitionId },
        observabilityLevel: { type: 'uinteger', value: fixture.pus018Obcp[i].observabilityLevel },
        priority: { type: 'uinteger', value: fixture.pus018Obcp[i].priority },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus018Obcp[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus018Obcp[i].pusElement.lastUpdateTime },
        },
      });
      json.pus018Obcp[i].pus18Parameter.should.be.an('array').that.have.lengthOf(fixture.pus018Obcp[i].pus18Parameter.length);
      for (let ii = 0; ii < fixture.pus018Obcp[i].pus18Parameter.length; ii += 1) {
        json.pus018Obcp[i].pus18Parameter[ii].should.be.an('object').that.have.properties({
          parameterId: { type: 'uinteger', value: fixture.pus018Obcp[i].pus18Parameter[ii].parameterId },
          parameterName: { type: 'string', value: fixture.pus018Obcp[i].pus18Parameter[ii].parameterName },
          value: { type: 'double', symbol: fixture.pus018Obcp[i].pus18Parameter[ii].value.toString() },
        });
      }
    }
    json.pus018ConfiguredObcp.should.be.an('array').that.have.lengthOf(fixture.pus018ConfiguredObcp.length);
    for (let i = 0; i < fixture.pus018ConfiguredObcp.length; i += 1) {
      json.pus018ConfiguredObcp[i].should.be.an('object').that.have.properties({
        id: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].id },
        hkParamNameForName: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForName },
        hkParamNameForId: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForId },
        hkParamNameForStatus: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForStatus },
        hkParamNameForPriority: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForPriority },
        hkParamNameForStepId: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForStepId },
        status: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].status },
        stepId: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].stepId },
        priority: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].priority },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus018ConfiguredObcp[i].pusElement.lastUpdateTime },
        },
      });
    }
  });
});

