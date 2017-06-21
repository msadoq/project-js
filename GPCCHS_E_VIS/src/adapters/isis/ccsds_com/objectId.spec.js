// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./objectId');
const { getObjectId } = require('../stubs');



describe('protobuf/isis/ccsds_com/ObjectId', () => {
  const fixture = getObjectId();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      objectType: {
        area: { type: 'ushort', value: fixture.objectType.area },
        service: { type: 'ushort', value: fixture.objectType.service },
        version: { type: 'uoctet', value: fixture.objectType.version },
        number: { type: 'ushort', value: fixture.objectType.number },
      },
      objectKey: {
        domaineId: { type: 'ushort', value: fixture.objectKey.domaineId },
        uid: { type: 'long', symbol: `${fixture.objectKey.uid}` },
      },
    });
    
  });
});
