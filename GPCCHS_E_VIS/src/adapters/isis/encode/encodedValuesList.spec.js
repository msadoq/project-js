// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodedValuesList');
const { getEncodedValuesList } = require('../stubs');



describe('protobuf/isis/encode/EncodedValuesList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodedValuesList.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodedValuesList');
  const fixture = getEncodedValuesList();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      largeSequenceCount: (typeof fixture.largeSequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.largeSequenceCount },
    });
    
    json.encodedValues.should.be.an('array').that.have.lengthOf(fixture.encodedValues.length);
    for (let i = 0; i < fixture.encodedValues.length; i += 1) {
      json.encodedValues[i].should.be.an('object').that.have.properties({
        rawValue: { type: 'blob', value: fixture.encodedValues[i].rawValue },
        sequenceCount: (typeof fixture.encodedValues[i].sequenceCount === 'undefined')
          ? null
          : { type: 'uinteger', value: fixture.encodedValues[i].sequenceCount },
        definitionId: { type: 'long', symbol: `${fixture.encodedValues[i].definitionId}` },
      });
      
    }
  });
});
