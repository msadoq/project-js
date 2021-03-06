// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./objectKey');
const { getObjectKey } = require('../stubs');



describe('protobuf/isis/ccsds_com/ObjectKey', () => {
  const fixture = getObjectKey();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      domaineId: { type: 'ushort', value: fixture.domaineId },
      uid: { type: 'long', symbol: `${fixture.uid}` },
    });
  });
});
