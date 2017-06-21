// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./objectDetails');
const { getObjectDetails } = require('../stubs');



describe('protobuf/isis/ccsds_com/ObjectDetails', () => {
  const fixture = getObjectDetails();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      related: { type: 'long', symbol: `${fixture.related}` },
      source: {
        objectType: {
          area: { type: 'ushort', value: fixture.source.objectType.area },
          service: { type: 'ushort', value: fixture.source.objectType.service },
          version: { type: 'uoctet', value: fixture.source.objectType.version },
          number: { type: 'ushort', value: fixture.source.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.source.objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.source.objectKey.uid}` },
        },
      },
    });
    
  });
});
