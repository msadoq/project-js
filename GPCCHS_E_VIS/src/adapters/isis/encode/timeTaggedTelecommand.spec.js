// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./timeTaggedTelecommand');
const { getTimeTaggedTelecommand } = require('../stubs');



describe('protobuf/isis/encode/TimeTaggedTelecommand', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TimeTaggedTelecommand.proto`, { keepCase: true })
    .lookup('encode.protobuf.TimeTaggedTelecommand');
  const fixture = getTimeTaggedTelecommand();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      ackField: { type: 'uinteger', value: fixture.ackField },
      sourceId: { type: 'uinteger', value: fixture.sourceId },
      subScheduledId: { type: 'uinteger', value: fixture.subScheduledId },
    });
    
    json.definitionIds.should.be.an('array').that.have.lengthOf(fixture.definitionIds.length);
    for (let i = 0; i < fixture.definitionIds.length; i += 1) {
      json.definitionIds[i].should.have.properties({
        type: 'identifier',
        value: fixture.definitionIds[i],
      });
    }
    json.dates.should.be.an('array').that.have.lengthOf(fixture.dates.length);
    for (let i = 0; i < fixture.dates.length; i += 1) {
      json.dates[i].should.have.properties({
        type: 'time',
        value: fixture.dates[i],
      });
    }
    json.rawValues.should.be.an('array').that.have.lengthOf(fixture.rawValues.length);
    for (let i = 0; i < fixture.rawValues.length; i += 1) {
      json.rawValues[i].should.have.properties({
        type: 'blob',
        value: fixture.rawValues[i],
      });
    }
  });
});
