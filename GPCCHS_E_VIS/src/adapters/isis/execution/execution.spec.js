// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');




describe('protobuf/isis/execution/Execution', () => {
  const fixture = stubData.getExecution();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.execution.Execution', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.execution.Execution', buffer);
    json.should.be.an('object').that.have.properties({
      launchingTime: { type: 'time', value: fixture.launchingTime },
    });
    
    json.launchingParameter.should.be.an('array').that.have.lengthOf(fixture.launchingParameter.length);
    for (let i = 0; i < fixture.launchingParameter.length; i += 1) {
      json.launchingParameter[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.launchingParameter[i].name },
        value: { type: 'double', symbol: fixture.launchingParameter[i].value.toString() },
      });
      
    }
  });
});

