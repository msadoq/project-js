// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./flagVal');
const { getFlagVal } = require('../stubs');



describe('protobuf/isis/cop1/FlagVal', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FlagVal.proto`, { keepCase: true })
    .lookup('cop1.protobuf.FlagVal');
  const fixture = getFlagVal();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      val: { type: 'integer', value: fixture.val },
      flag: { type: 'boolean', value: fixture.flag },
    });
    
    
  });
});
