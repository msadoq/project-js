// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');



describe('protobuf/isis/ccsds_mc/GroupDefinition', () => {
  const fixture = stubData.getGroupDefinition();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.ccsds_mc.GroupDefinition', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.ccsds_mc.GroupDefinition', buffer);
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      description: { type: 'string', value: fixture.description },
      domain: { type: 'ushort', value: fixture.domain },
    });
    decodeRaw(json.objectType).should.be.an('object').that.have.properties({
      area: { type: 'ushort', value: fixture.objectType.area },
      service: { type: 'ushort', value: fixture.objectType.service },
      version: { type: 'uoctet', value: fixture.objectType.version },
      number: { type: 'ushort', value: fixture.objectType.number },
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

