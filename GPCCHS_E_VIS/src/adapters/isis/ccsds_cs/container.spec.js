// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./container');
const { getContainer } = require('../stubs');



describe('protobuf/isis/ccsds_cs/Container', () => {
  const fixture = getContainer();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      slotId: { type: 'ushort', value: fixture.slotId },
      containerTime: { type: 'time', value: fixture.containerTime },
    });
  });
});
