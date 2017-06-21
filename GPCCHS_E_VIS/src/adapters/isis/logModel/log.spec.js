// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./log');
const { getLog } = require('../stubs');



describe('protobuf/isis/logModel/Log', () => {
  const fixture = getLog();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
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
