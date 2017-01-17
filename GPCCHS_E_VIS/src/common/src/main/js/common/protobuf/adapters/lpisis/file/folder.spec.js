// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/file/Folder', () => {
  const fixture = stubData.getFolder();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.Folder', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.Folder', buffer);
    json.should.be.an('object').that.have.properties({
      path: { type: 'uri', value: fixture.path },
    });
    json.profilesAccess.should.be.an('array').that.have.lengthOf(fixture.profilesAccess.length);
    for (let i = 0; i < fixture.profilesAccess.length; i += 1) {
      json.profilesAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.profilesAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.profilesAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.profilesAccess[i].write },
        profile: {
          login: { type: 'string', value: fixture.profilesAccess[i].profile.login },
          password: { type: 'string', value: fixture.profilesAccess[i].profile.password },
          profile: { type: 'string', value: fixture.profilesAccess[i].profile.profile },
          userTime: { type: 'time', value: fixture.profilesAccess[i].profile.userTime },
        },
      });
      
    }
    json.usersAccess.should.be.an('array').that.have.lengthOf(fixture.usersAccess.length);
    for (let i = 0; i < fixture.usersAccess.length; i += 1) {
      json.usersAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.usersAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.usersAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.usersAccess[i].write },
        user: {
          login: { type: 'string', value: fixture.usersAccess[i].user.login },
          password: { type: 'string', value: fixture.usersAccess[i].user.password },
          profile: { type: 'string', value: fixture.usersAccess[i].user.profile },
          userTime: { type: 'time', value: fixture.usersAccess[i].user.userTime },
        },
      });
      
    }
  });
});

