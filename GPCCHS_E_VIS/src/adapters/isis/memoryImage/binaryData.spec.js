// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./binaryData');
const { getBinaryData } = require('../stubs');



describe('protobuf/isis/memoryImage/BinaryData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/BinaryData.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.BinaryData');
  const fixture = getBinaryData();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      address: { type: 'ulong', symbol: `${fixture.address}` },
      data: { type: 'string', value: fixture.data },
    });
    
    
  });
});
