// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./objectId');
const { getObjectId } = require('../stubs');



describe('protobuf/isis/ccsds_com/ObjectId', () => {
  const fixture = getObjectId();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
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
