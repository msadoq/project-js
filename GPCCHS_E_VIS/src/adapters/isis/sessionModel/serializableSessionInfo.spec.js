// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./serializableSessionInfo');
const { getSerializableSessionInfo } = require('../stubs');



describe('protobuf/isis/sessionModel/SerializableSessionInfo', () => {
  const fixture = getSerializableSessionInfo();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      oid: {
        objectType: {
          area: { type: 'ushort', value: fixture.oid.objectType.area },
          service: { type: 'ushort', value: fixture.oid.objectType.service },
          version: { type: 'uoctet', value: fixture.oid.objectType.version },
          number: { type: 'ushort', value: fixture.oid.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.oid.objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.oid.objectKey.uid}` },
        },
      },
      name: { type: 'string', value: fixture.name },
      state: { type: 'uinteger', value: fixture.state },
      id: { type: 'ushort', value: fixture.id },
      path: { type: 'string', value: fixture.path },
      lastStateUpdateTime: { type: 'ulong', symbol: `${fixture.lastStateUpdateTime}` },
      healthStatus: { type: 'uoctet', value: fixture.healthStatus },
      domain: { type: 'ushort', value: fixture.domain },
      timeDelta: { type: 'long', symbol: `${fixture.timeDelta}` },
      properties: { type: 'string', value: fixture.properties },
      variables: { type: 'string', value: fixture.variables },
    });
  });
});
