// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./timeBasedDataFinetime');
const { getTimeBasedDataFinetime } = require('../stubs');



describe('protobuf/isis/timeBasedDataType/TimeBasedDataFinetime', () => {
  const fixture = getTimeBasedDataFinetime();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'finetime', value: fixture.value },
    });
  });
});
