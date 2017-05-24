// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/file/DocVersion', () => {
  const fixture = stubData.getDocVersion();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.DocVersion', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.DocVersion', buffer);
    json.should.be.an('object').that.have.properties({
      externalVersion: { type: 'string', value: fixture.externalVersion },
      internalVersion: { type: 'ushort', value: fixture.internalVersion },
      content: (typeof fixture.content === 'undefined')
        ? null
        : { type: 'double', symbol: fixture.content.toString() },
    });
    json.properties.should.be.an('array').that.have.lengthOf(fixture.properties.length);
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.properties[i].name },
        value: { type: 'double', symbol: fixture.properties[i].value.toString() },
      });
    }
  });
});

