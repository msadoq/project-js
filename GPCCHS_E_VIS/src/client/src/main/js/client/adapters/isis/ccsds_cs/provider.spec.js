// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./provider');
const { getProvider } = require('../stubs');



describe('protobuf/isis/ccsds_cs/Provider', () => {
  const fixture = getProvider();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      slotID: { type: 'ushort', value: fixture.slotID },
      factoryID: { type: 'ushort', value: fixture.factoryID },
      providerName: { type: 'string', value: fixture.providerName },
      network: { type: 'uoctet', value: fixture.network },
      session: { type: 'ulong', symbol: `${fixture.session}` },
      serviceProperties: { type: 'uinteger', value: fixture.serviceProperties },
      serviceAddress: {
        supportedCapabilities: { type: 'uinteger', value: fixture.serviceAddress.supportedCapabilities },
        supportedLevels: { type: 'uinteger', value: fixture.serviceAddress.supportedLevels },
        qoSproperties: { type: 'uinteger', value: fixture.serviceAddress.qoSproperties },
        priorityLevels: { type: 'uinteger', value: fixture.serviceAddress.priorityLevels },
        serviceURI: { type: 'uri', value: fixture.serviceAddress.serviceURI },
        dataURI: { type: 'uri', value: fixture.serviceAddress.dataURI },
        dataName: { type: 'string', value: fixture.serviceAddress.dataName },
      },
      providerProperties: { type: 'string', value: fixture.providerProperties },
      providerTime: { type: 'time', value: fixture.providerTime },
    });
  });
});
