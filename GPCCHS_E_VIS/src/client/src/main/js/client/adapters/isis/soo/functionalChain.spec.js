// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./functionalChain');
const { getFunctionalChain } = require('../stubs');

const activityRequest = require('./activityRequest');

describe('protobuf/isis/soo/FunctionalChain', () => {
  const fixture = getFunctionalChain();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      name: { type: 'string', value: fixture.name },
      activity: { type: 'enum', value: fixture.activity, symbol: activityRequest[fixture.activity] },
      creationDate: { type: 'time', value: fixture.creationDate },
    });
  });
});
