// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./statValue');
const { getStatValue } = require('../stubs');



describe('protobuf/isis/statAggregation/StatValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatValue.proto`, { keepCase: true })
    .lookup('statAggregation.protobuf.StatValue');
  const fixture = getStatValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      related: { type: 'long', symbol: `${fixture.related}` },
      attrValue: { type: 'double', symbol: fixture.attrValue.toString() },
    });
    
    
  });
});
