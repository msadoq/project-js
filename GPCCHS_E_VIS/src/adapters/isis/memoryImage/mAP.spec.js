// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./mAP');
const { getMAP } = require('../stubs');



describe('protobuf/isis/memoryImage/MAP', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/MAP.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.MAP');
  const fixture = getMAP();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.data.should.be.an('array').that.have.lengthOf(fixture.data.length);
    for (let i = 0; i < fixture.data.length; i += 1) {
      json.data[i].should.be.an('object').that.have.properties({
        label: { type: 'string', value: fixture.data[i].label },
        address: { type: 'ulong', symbol: `${fixture.data[i].address}` },
        dataSize: { type: 'uinteger', value: fixture.data[i].dataSize },
      });
      
    }
  });
});
