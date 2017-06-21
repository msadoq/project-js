// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encodeLargeTCInvocation');
const { getEncodeLargeTCInvocation } = require('../stubs');



describe('protobuf/isis/encode/EncodeLargeTCInvocation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeLargeTCInvocation.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeLargeTCInvocation');
  const fixture = getEncodeLargeTCInvocation();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      definitionId: { type: 'long', symbol: `${fixture.definitionId}` },
      rawValue: { type: 'blob', value: fixture.rawValue },
    });
    
    
  });
});
