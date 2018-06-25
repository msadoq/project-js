// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./status');
const { getStatus } = require('../stubs');

const operationStatus = require('./operationStatus');

describe('protobuf/isis/soo/Status', () => {
  const fixture = getStatus();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      operationStatus: { type: 'enum', value: fixture.operationStatus, symbol: operationStatus[fixture.operationStatus] },
      occurenceDate: { type: 'time', value: fixture.occurenceDate },
    });
  });
});
