// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./userContext');
const { getUserContext } = require('../stubs');



describe('protobuf/isis/ccsds_cs/UserContext', () => {
  const fixture = getUserContext();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      userId: { type: 'long', symbol: `${fixture.userId}` },
      currentProfileId: { type: 'long', symbol: `${fixture.currentProfileId}` },
      userContextTime: { type: 'time', value: fixture.userContextTime },
    });
  });
});
