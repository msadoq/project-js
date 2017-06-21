// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./eventDefinition');
const { getEventDefinition } = require('../stubs');



describe('protobuf/isis/event/EventDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EventDefinition.proto`, { keepCase: true })
    .lookup('event.protobuf.EventDefinition');
  const fixture = getEventDefinition();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
    });
    
    json.pattern.should.be.an('array').that.have.lengthOf(fixture.pattern.length);
    for (let i = 0; i < fixture.pattern.length; i += 1) {
      json.pattern[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.pattern[i].name },
        value: { type: 'double', symbol: fixture.pattern[i].value.toString() },
      });
      
    }
  });
});
