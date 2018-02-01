// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./archiveDetails');
const { getArchiveDetails } = require('../stubs');



describe('protobuf/isis/ccsds_com/ArchiveDetails', () => {
  const fixture = getArchiveDetails();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      instId: { type: 'long', symbol: `${fixture.instId}` },
      objectDetails: {
        related: { type: 'long', symbol: `${fixture.objectDetails.related}` },
        source: {
          objectType: {
            area: { type: 'ushort', value: fixture.objectDetails.source.objectType.area },
            service: { type: 'ushort', value: fixture.objectDetails.source.objectType.service },
            version: { type: 'uoctet', value: fixture.objectDetails.source.objectType.version },
            number: { type: 'ushort', value: fixture.objectDetails.source.objectType.number },
          },
          objectKey: {
            domaineId: { type: 'ushort', value: fixture.objectDetails.source.objectKey.domaineId },
            uid: { type: 'long', symbol: `${fixture.objectDetails.source.objectKey.uid}` },
          },
        },
      },
      slotId: { type: 'ushort', value: fixture.slotId },
      timestamp: { type: 'finetime', value: fixture.timestamp },
      providerId: { type: 'ushort', value: fixture.providerId },
    });
  });
});
