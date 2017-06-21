// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./user');
const { getUser } = require('../stubs');



describe('protobuf/isis/ccsds_cs/User', () => {
  const fixture = getUser();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.login },
      password: { type: 'string', value: fixture.password },
      profile: { type: 'string', value: fixture.profile },
      userTime: { type: 'time', value: fixture.userTime },
    });
    
  });
});
