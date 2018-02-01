// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./log');
const { getLog } = require('../stubs');



describe('protobuf/isis/logModel/Log', () => {
  const fixture = getLog();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      logBookEventDefinitionName: { type: 'string', value: fixture.logBookEventDefinitionName },
      objectTypeArea: { type: 'ushort', value: fixture.objectTypeArea },
      objectTypeService: { type: 'ushort', value: fixture.objectTypeService },
      objectTypeNumber: { type: 'ushort', value: fixture.objectTypeNumber },
      objectTypeVersion: { type: 'uoctet', value: fixture.objectTypeVersion },
      channels: { type: 'uoctet', value: fixture.channels },
      level: { type: 'uoctet', value: fixture.level },
      criticity: { type: 'string', value: fixture.criticity },
      authId: { type: 'blob', value: fixture.authId },
      userName: { type: 'string', value: fixture.userName },
      userProfileId: { type: 'ushort', value: fixture.userProfileId },
      userProfileName: { type: 'string', value: fixture.userProfileName },
      pattern: { type: 'string', value: fixture.pattern },
      systemDate: { type: 'time', value: fixture.systemDate },
      specificAttributes: { type: 'string', value: fixture.specificAttributes },
      eventDate: { type: 'time', value: fixture.eventDate },
      mission: { type: 'string', value: fixture.mission },
      satellite: { type: 'uoctet', value: fixture.satellite },
      providerId: { type: 'ushort', value: fixture.providerId },
      providerName: { type: 'string', value: fixture.providerName },
      source: { type: 'string', value: fixture.source },
      service: { type: 'string', value: fixture.service },
      sessionId: { type: 'ushort', value: fixture.sessionId },
      sessionName: { type: 'string', value: fixture.sessionName },
      slotId: { type: 'ushort', value: fixture.slotId },
      domainId: { type: 'ushort', value: fixture.domainId },
    });
  });
});
