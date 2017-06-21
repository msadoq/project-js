// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./memoryImage');
const { getMemoryImage } = require('../stubs');



describe('protobuf/isis/memoryImage/MemoryImage', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/MemoryImage.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.MemoryImage');
  const fixture = getMemoryImage();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      map: (typeof fixture.map === 'undefined')
        ? null
        : {
          
        },
    });
    
    json.binaryData.should.be.an('array').that.have.lengthOf(fixture.binaryData.length);
    for (let i = 0; i < fixture.binaryData.length; i += 1) {
      json.binaryData[i].should.be.an('object').that.have.properties({
        address: { type: 'ulong', symbol: `${fixture.binaryData[i].address}` },
        data: { type: 'string', value: fixture.binaryData[i].data },
      });
      
    }
  });
});
