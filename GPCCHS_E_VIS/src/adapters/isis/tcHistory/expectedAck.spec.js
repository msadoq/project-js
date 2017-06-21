// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./expectedAck');
const { getExpectedAck } = require('../stubs');



describe('protobuf/isis/tcHistory/ExpectedAck', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ExpectedAck.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.ExpectedAck');
  const fixture = getExpectedAck();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      acceptance: { type: 'boolean', value: fixture.acceptance },
      executionComplete: { type: 'boolean', value: fixture.executionComplete },
      executionStart: { type: 'boolean', value: fixture.executionStart },
    });
    
    
  });
});
