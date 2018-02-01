// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./timeStructure');
const { getTimeStructure } = require('../stubs');



describe('protobuf/isis/modelTimebar/TimeStructure', () => {
  const fixture = getTimeStructure();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      cmdId: { type: 'integer', value: fixture.cmdId },
      intParameter: { type: 'integer', value: fixture.intParameter },
      date: { type: 'time', value: fixture.date },
    });
  });
});
