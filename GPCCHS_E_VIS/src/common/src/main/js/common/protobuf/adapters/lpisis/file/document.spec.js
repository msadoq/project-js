require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/lpisis/file/document', () => {
  const fixture = stubData.getDocument();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.Document', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.Document', buffer);
    json.should.be.an('object').that.have.properties({
      lockedBy: {
        login: { type: 'string', value: fixture.lockedBy.login },
        password: { type: 'string', value: fixture.lockedBy.password },
        profile: { type: 'string', value: fixture.lockedBy.profile },
        userTime: { type: 'time', value: fixture.lockedBy.userTime },
      },
      dirname: {
        type: 'uri',
        value: fixture.dirname,
      },
      basename: {
        type: 'string',
        value: fixture.basename,
      },
      confidentiality: {
        type: 'uoctet',
        value: fixture.confidentiality,
      },
    });
    json.should.have.a.property('properties').that.is.an('array');
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.have.properties({
        name: {
          type: 'identifier',
          value: fixture.properties[i].name,
        },
        value: {
          type: 'ulong',
          value: fixture.properties[i].value,
        },
      });
    }
    json.should.have.a.property('profilesAccess').that.is.an('array');
    for (let i = 0; i < fixture.profilesAccess.length; i += 1) {
      json.profilesAccess[i].should.have.properties({
        read: {
          type: 'boolean',
          value: fixture.profilesAccess[i].read,
        },
        changeAccessRight: {
          type: 'boolean',
          value: fixture.profilesAccess[i].changeAccessRight,
        },
        write: {
          type: 'boolean',
          value: fixture.profilesAccess[i].write,
        },
        profile: {
          login: { type: 'string', value: fixture.profilesAccess[i].profile.login },
          password: { type: 'string', value: fixture.profilesAccess[i].profile.password },
          profile: { type: 'string', value: fixture.profilesAccess[i].profile.profile },
          userTime: { type: 'time', value: fixture.profilesAccess[i].profile.userTime },
        },
      });
    }
    json.should.have.a.property('usersAccess').that.is.an('array');
    for (let i = 0; i < fixture.usersAccess.length; i += 1) {
      json.usersAccess[i].should.have.properties({
        read: {
          type: 'boolean',
          value: fixture.usersAccess[i].read,
        },
        changeAccessRight: {
          type: 'boolean',
          value: fixture.usersAccess[i].changeAccessRight,
        },
        write: {
          type: 'boolean',
          value: fixture.usersAccess[i].write,
        },
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
