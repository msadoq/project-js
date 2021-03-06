// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./objectType');
const { getObjectType } = require('../stubs');



describe('protobuf/isis/ccsds_com/ObjectType', () => {
  const fixture = getObjectType();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      area: { type: 'ushort', value: fixture.area },
      service: { type: 'ushort', value: fixture.service },
      version: { type: 'uoctet', value: fixture.version },
      number: { type: 'ushort', value: fixture.number },
    });
  });
});
