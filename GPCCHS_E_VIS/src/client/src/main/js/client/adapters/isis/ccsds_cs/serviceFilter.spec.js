// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./serviceFilter');
const { getServiceFilter } = require('../stubs');



describe('protobuf/isis/ccsds_cs/ServiceFilter', () => {
  const fixture = getServiceFilter();
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
      factoryID: { type: 'ushort', value: fixture.factoryID },
      sessionOid: { type: 'ulong', symbol: `${fixture.sessionOid}` },
      network: { type: 'uoctet', value: fixture.network },
      slotOid: { type: 'ushort', value: fixture.slotOid },
      domainID: { type: 'ushort', value: fixture.domainID },
      providerName: { type: 'string', value: fixture.providerName },
    });
  });
});
