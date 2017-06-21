// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./groupDefinition');
const { getGroupDefinition } = require('../stubs');



describe('protobuf/isis/ccsds_mc/GroupDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GroupDefinition.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.GroupDefinition');
  const fixture = getGroupDefinition();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      description: { type: 'string', value: fixture.description },
      objectType: {
        area: { type: 'ushort', value: fixture.objectType.area },
        service: { type: 'ushort', value: fixture.objectType.service },
        version: { type: 'uoctet', value: fixture.objectType.version },
        number: { type: 'ushort', value: fixture.objectType.number },
      },
      domain: { type: 'ushort', value: fixture.domain },
    });
    
    json.instanceIds.should.be.an('array').that.have.lengthOf(fixture.instanceIds.length);
    for (let i = 0; i < fixture.instanceIds.length; i += 1) {
      json.instanceIds[i].should.have.properties({
        type: 'long',
        symbol: `${fixture.instanceIds[i]}`,
      });
    }
  });
});
