// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./ackSMS');
const { getAckSMS } = require('../stubs');



describe('protobuf/isis/ackRequest/AckSMS', () => {
  const fixture = getAckSMS();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      systemCreationDate: { type: 'time', value: fixture.systemCreationDate },
      applicationCreationDate: { type: 'time', value: fixture.applicationCreationDate },
    });
    
  });
});
