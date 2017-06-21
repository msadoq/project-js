// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./compositeFilterSet');
const { getCompositeFilterSet } = require('../stubs');



describe('protobuf/isis/ccsds_com/CompositeFilterSet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CompositeFilterSet.proto`, { keepCase: true })
    .lookup('ccsds_com.protobuf.CompositeFilterSet');
  const fixture = getCompositeFilterSet();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.compositeFilter.should.be.an('array').that.have.lengthOf(fixture.compositeFilter.length);
    for (let i = 0; i < fixture.compositeFilter.length; i += 1) {
      json.compositeFilter[i].should.be.an('object').that.have.properties({
        fieldName: { type: 'string', value: fixture.compositeFilter[i].fieldName },
        type: { type: 'uinteger', value: fixture.compositeFilter[i].type },
        fieldValue: { type: 'double', symbol: fixture.compositeFilter[i].fieldValue.toString() },
      });
      
    }
  });
});
