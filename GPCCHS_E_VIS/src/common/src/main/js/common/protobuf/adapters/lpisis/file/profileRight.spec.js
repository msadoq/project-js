require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/lpisis/file/profileRight', () => {
  const fixture = stubData.getProfileRight();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.ProfileRight', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.ProfileRight', buffer);
    json.should.be.an('object').that.have.properties({
      read: {
        type: 'boolean',
        value: fixture.read,
      },
      changeAccessRight: {
        type: 'boolean',
        value: fixture.changeAccessRight,
      },
      write: {
        type: 'boolean',
        value: fixture.write,
      },
      profile: {
        login: { type: 'string', value: fixture.profile.login },
        password: { type: 'string', value: fixture.profile.password },
        profile: { type: 'string', value: fixture.profile.profile },
        userTime: { type: 'time', value: fixture.profile.userTime },
      },
    });
  });
});
