// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodedValue');
const { getEncodedValue } = require('../stubs');



describe('protobuf/isis/encode/EncodedValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodedValue.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodedValue');
  const fixture = getEncodedValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      rawValue: { type: 'blob', value: fixture.rawValue },
      sequenceCount: (typeof fixture.sequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.sequenceCount },
      definitionId: { type: 'long', symbol: `${fixture.definitionId}` },
    });
    
    
  });
});
