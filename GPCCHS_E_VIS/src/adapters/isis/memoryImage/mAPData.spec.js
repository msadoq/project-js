// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./mAPData');
const { getMAPData } = require('../stubs');



describe('protobuf/isis/memoryImage/MAPData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/MAPData.proto`, { keepCase: true })
    .lookup('memoryImage.protobuf.MAPData');
  const fixture = getMAPData();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      label: { type: 'string', value: fixture.label },
      address: { type: 'ulong', symbol: `${fixture.address}` },
      dataSize: { type: 'uinteger', value: fixture.dataSize },
    });
    
    
  });
});
