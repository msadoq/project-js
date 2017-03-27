// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/execution/Execution', () => {
  const fixture = stubData.getExecution();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.execution.Execution', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.execution.Execution', buffer);
    json.should.be.an('object').that.have.properties({
      launchingTime: { type: 'time', value: fixture.launchingTime },
    });
    json.launchingParameter.should.be.an('array').that.have.lengthOf(fixture.launchingParameter.length);
    for (let i = 0; i < fixture.launchingParameter.length; i += 1) {
      json.launchingParameter[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.launchingParameter[i].name },
        value: { type: 'double', value: fixture.launchingParameter[i].value },
      });
      
    }
  });
});

