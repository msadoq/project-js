// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./attributeValue');
const { getAttributeValue } = require('../stubs');



describe('protobuf/isis/ccsds_mc/AttributeValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/AttributeValue.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.AttributeValue');
  const fixture = getAttributeValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      value: { type: 'double', symbol: fixture.value.toString() },
    });
    
    
  });
});
