// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./specificAttributeDefinition');
const { getSpecificAttributeDefinition } = require('../stubs');



describe('protobuf/isis/event/SpecificAttributeDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SpecificAttributeDefinition.proto`, { keepCase: true })
    .lookup('event.protobuf.SpecificAttributeDefinition');
  const fixture = getSpecificAttributeDefinition();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      type: { type: 'ulong', symbol: `${fixture.type}` },
      workingUnit: { type: 'string', value: fixture.workingUnit },
      displayUnit: { type: 'string', value: fixture.displayUnit },
      format: { type: 'string', value: fixture.format },
    });
    
    
  });
});
