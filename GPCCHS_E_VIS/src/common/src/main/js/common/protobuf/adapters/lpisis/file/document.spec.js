// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/file/Document', () => {
  const fixture = stubData.getDocument();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.Document', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.Document', buffer);
    json.should.be.an('object').that.have.properties({
      lockedBy: (typeof fixture.lockedBy === 'undefined')
        ? null
        : {
          login: { type: 'string', value: fixture.lockedBy.login },
          password: { type: 'string', value: fixture.lockedBy.password },
          profile: { type: 'string', value: fixture.lockedBy.profile },
          userTime: { type: 'time', value: fixture.lockedBy.userTime },
        },
      dirname: { type: 'uri', value: fixture.dirname },
      basename: { type: 'string', value: fixture.basename },
      confidentiality: { type: 'uoctet', value: fixture.confidentiality },
    });
    json.properties.should.be.an('array').that.have.lengthOf(fixture.properties.length);
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.properties[i].name },
        value: { type: 'double', symbol: fixture.properties[i].value.toString() },
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
  });
});

