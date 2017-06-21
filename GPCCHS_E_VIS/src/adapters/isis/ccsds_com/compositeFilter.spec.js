// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./compositeFilter');
const { getCompositeFilter } = require('../stubs');



describe('protobuf/isis/ccsds_com/CompositeFilter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CompositeFilter.proto`, { keepCase: true })
    .lookup('ccsds_com.protobuf.CompositeFilter');
  const fixture = getCompositeFilter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      fieldName: { type: 'string', value: fixture.fieldName },
      type: { type: 'uinteger', value: fixture.type },
      fieldValue: { type: 'double', symbol: fixture.fieldValue.toString() },
    });
    
    
  });
});
