// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/connection/UCPReport', () => {
  const fixture = stubData.getUCPReport();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.connection.UCPReport', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.connection.UCPReport', buffer);
    json.should.be.an('object').that.have.properties({
      date: { type: 'time', value: fixture.date },
    });
    json.parameters.should.be.an('array').that.have.lengthOf(fixture.parameters.length);
    for (let i = 0; i < fixture.parameters.length; i += 1) {
      json.parameters[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.parameters[i].name },
        value: { type: 'double', value: fixture.parameters[i].value },
      });
      
    }
  });
});

