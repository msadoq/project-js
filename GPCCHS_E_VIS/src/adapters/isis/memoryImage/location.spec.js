// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./location');
const { getLocation } = require('../stubs');



describe('protobuf/isis/memoryImage/Location', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Location.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.Location');
  const fixture = getLocation();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      filename: { type: 'string', value: fixture.filename },
      path: { type: 'string', value: fixture.path },
    });
    
    
  });
});
