// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodeArgumentRequest');
const { getEncodeArgumentRequest } = require('../stubs');



describe('protobuf/isis/encode/EncodeArgumentRequest', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeArgumentRequest.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeArgumentRequest');
  const fixture = getEncodeArgumentRequest();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      definitionId: { type: 'long', symbol: `${fixture.definitionId}` },
      engValue: { type: 'double', symbol: fixture.engValue.toString() },
      bitLength: (typeof fixture.bitLength === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.bitLength },
      newEncodingFormat: (typeof fixture.newEncodingFormat === 'undefined')
        ? null
        : { type: 'string', value: fixture.newEncodingFormat },
      newRawValueType: (typeof fixture.newRawValueType === 'undefined')
        ? null
        : { type: 'string', value: fixture.newRawValueType },
    });
    
    
  });
});
