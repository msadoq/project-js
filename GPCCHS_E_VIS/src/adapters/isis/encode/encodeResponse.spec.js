// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodeResponse');
const { getEncodeResponse } = require('../stubs');

const encodedType = require('./encodedType');

describe('protobuf/isis/encode/EncodeResponse', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeResponse.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeResponse');
  const fixture = getEncodeResponse();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      encodedType: { type: 'enum', value: fixture.encodedType, symbol: encodedType[fixture.encodedType] },
      encodedValues: {
        largeSequenceCount: (typeof fixture.encodedValues.largeSequenceCount === 'undefined')
          ? null
          : { type: 'uinteger', value: fixture.encodedValues.largeSequenceCount },
      },
    });
    
    
  });
});
