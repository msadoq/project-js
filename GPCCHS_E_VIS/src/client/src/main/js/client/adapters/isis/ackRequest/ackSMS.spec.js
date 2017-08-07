// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./ackSMS');
const { getAckSMS } = require('../stubs');



describe('protobuf/isis/ackRequest/AckSMS', () => {
  const fixture = getAckSMS();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      systemCreationDate: { type: 'time', value: fixture.systemCreationDate },
      applicationCreationDate: { type: 'time', value: fixture.applicationCreationDate },
    });
  });
});
