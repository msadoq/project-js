// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./executionStatus');
const { getExecutionStatus } = require('../stubs');



describe('protobuf/isis/execution/ExecutionStatus', () => {
  const fixture = getExecutionStatus();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      status: { type: 'integer', value: fixture.status },
      statusTime: { type: 'time', value: fixture.statusTime },
    });
  });
});
