// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./result');
const { getResult } = require('../stubs');



describe('protobuf/isis/soo/Result', () => {
  const fixture = getResult();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      confirmationStatus: { type: 'string', value: fixture.confirmationStatus },
      duration: { type: 'duration', value: fixture.duration },
      executionStatus: { type: 'string', value: fixture.executionStatus },
      detailedStatus: { type: 'string', value: fixture.detailedStatus },
      exceptionDetails: { type: 'string', value: fixture.exceptionDetails },
      startDatetime: { type: 'time', value: fixture.startDatetime },
      endDatetime: { type: 'time', value: fixture.endDatetime },
    });
  });
});
