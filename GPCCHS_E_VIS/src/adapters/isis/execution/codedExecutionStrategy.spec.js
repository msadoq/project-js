// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./codedExecutionStrategy');
const { getCodedExecutionStrategy } = require('../stubs');



describe('protobuf/isis/execution/CodedExecutionStrategy', () => {
  const fixture = getCodedExecutionStrategy();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      code: { type: 'uoctet', value: fixture.code },
    });
    
  });
});
