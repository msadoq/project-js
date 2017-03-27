// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/file/Collection', () => {
  const fixture = stubData.getCollection();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.file.Collection', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.file.Collection', buffer);
    json.should.be.an('object').that.have.properties({
      collectionName: { type: 'string', value: fixture.collectionName },
      collectionDirname: { type: 'uri', value: fixture.collectionDirname },
      virtualName: { type: 'string', value: fixture.virtualName },
      isVirtualFolder: { type: 'boolean', value: fixture.isVirtualFolder },
      collectionRefForVf: (typeof fixture.collectionRefForVf === 'undefined')
        ? null
        : { type: 'long', symbol: `${fixture.collectionRefForVf}` },
      user: (typeof fixture.user === 'undefined')
        ? null
        : {
          login: { type: 'string', value: fixture.user.login },
          password: { type: 'string', value: fixture.user.password },
          profile: { type: 'string', value: fixture.user.profile },
          userTime: { type: 'time', value: fixture.user.userTime },
        },
      lockedBy: (typeof fixture.lockedBy === 'undefined')
        ? null
        : {
          login: { type: 'string', value: fixture.lockedBy.login },
          password: { type: 'string', value: fixture.lockedBy.password },
          profile: { type: 'string', value: fixture.lockedBy.profile },
          userTime: { type: 'time', value: fixture.lockedBy.userTime },
        },
    });
    json.documents.should.be.an('array').that.have.lengthOf(fixture.documents.length);
    for (let i = 0; i < fixture.documents.length; i += 1) {
      json.documents[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.documents[i].name },
        version: { type: 'string', value: fixture.documents[i].version },
        uri: { type: 'uri', value: fixture.documents[i].uri },
        brokenLink: { type: 'boolean', value: fixture.documents[i].brokenLink },
      });
    }
    json.virtualFolders.should.be.an('array').that.have.lengthOf(fixture.virtualFolders.length);
    for (let i = 0; i < fixture.virtualFolders.length; i += 1) {
      json.virtualFolders[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.virtualFolders[i].name },
        uid: { type: 'long', symbol: `${fixture.virtualFolders[i].uid}` },
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

