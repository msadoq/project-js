// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/ccsds_cs/ProviderDefinition', () => {
  const fixture = stubData.getProviderDefinition();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_cs.ProviderDefinition', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_cs.ProviderDefinition', buffer);
    json.should.be.an('object').that.have.properties({
      providerDefinitionName: { type: 'identifier', value: fixture.providerDefinitionName },
      providerDefinitionTime: { type: 'time', value: fixture.providerDefinitionTime },
    });
  });
});

