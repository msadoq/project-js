// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./serializableFunctionInfo');
const { getSerializableFunctionInfo } = require('../stubs');



describe('protobuf/isis/sessionModel/SerializableFunctionInfo', () => {
  const fixture = getSerializableFunctionInfo();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      sessionOid: {
        objectType: {
          area: { type: 'ushort', value: fixture.sessionOid.objectType.area },
          service: { type: 'ushort', value: fixture.sessionOid.objectType.service },
          version: { type: 'uoctet', value: fixture.sessionOid.objectType.version },
          number: { type: 'ushort', value: fixture.sessionOid.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.sessionOid.objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.sessionOid.objectKey.uid}` },
        },
      },
      eid: {
        objectType: {
          area: { type: 'ushort', value: fixture.eid.objectType.area },
          service: { type: 'ushort', value: fixture.eid.objectType.service },
          version: { type: 'uoctet', value: fixture.eid.objectType.version },
          number: { type: 'ushort', value: fixture.eid.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: fixture.eid.objectKey.domaineId },
          uid: { type: 'long', symbol: `${fixture.eid.objectKey.uid}` },
        },
      },
      name: { type: 'string', value: fixture.name },
      feature: { type: 'string', value: fixture.feature },
      configuration: { type: 'string', value: fixture.configuration },
      node: { type: 'string', value: fixture.node },
      state: { type: 'uinteger', value: fixture.state },
      confId: { type: 'ushort', value: fixture.confId },
      autostart: { type: 'boolean', value: fixture.autostart },
      type: { type: 'uoctet', value: fixture.type },
      instanceNumber: { type: 'ushort', value: fixture.instanceNumber },
      lastStateUpdateTime: { type: 'ulong', symbol: `${fixture.lastStateUpdateTime}` },
      availability: { type: 'boolean', value: fixture.availability },
      controlURI: { type: 'string', value: fixture.controlURI },
      viewURI: { type: 'string', value: fixture.viewURI },
    });
    
  });
});
