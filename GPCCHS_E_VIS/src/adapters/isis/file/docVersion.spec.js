// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./docVersion');
const { getDocVersion } = require('../stubs');



describe('protobuf/isis/file/DocVersion', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DocVersion.proto`, { keepCase: true })
    .lookup('file.protobuf.DocVersion');
  const fixture = getDocVersion();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
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
