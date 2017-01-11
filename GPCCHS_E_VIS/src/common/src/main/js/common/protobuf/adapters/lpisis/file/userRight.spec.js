require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/lpisis/file/userRight', () => {
  const fixture = stubData.getUserRight();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.UserRight', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.UserRight', buffer);
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
      user: {
        login: { type: 'string', value: fixture.user.login },
        password: { type: 'string', value: fixture.user.password },
        profile: { type: 'string', value: fixture.user.profile },
        userTime: { type: 'time', value: fixture.user.userTime },
      },
    });
  });
});
