// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./loginRole');
const { getLoginRole } = require('../stubs');



describe('protobuf/isis/ccsds_cs/LoginRole', () => {
  const fixture = getLoginRole();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      loginRoleIdentifier: { type: 'identifier', value: fixture.loginRoleIdentifier },
      loginRoleTime: { type: 'time', value: fixture.loginRoleTime },
    });
  });
});
