// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');

const { decodeRaw } = require('../types');



describe('protobuf/isis/file/Collection', () => {
  const fixture = stubData.getCollection();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.file.Collection', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.file.Collection', buffer);
    json.should.be.an('object').that.have.properties({
      collectionName: { type: 'string', value: fixture.collectionName },
      collectionDirname: { type: 'uri', value: fixture.collectionDirname },
      virtualName: { type: 'string', value: fixture.virtualName },
      isVirtualFolder: { type: 'boolean', value: fixture.isVirtualFolder },
      collectionRefForVf: (typeof fixture.collectionRefForVf === 'undefined') 
        ? null 
        : { type: 'long', symbol: `${fixture.collectionRefForVf}` },
    });
    decodeRaw(json.user).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.user.login },
      password: { type: 'string', value: fixture.user.password },
      profile: { type: 'string', value: fixture.user.profile },
      userTime: { type: 'time', value: fixture.user.userTime },
    });
    decodeRaw(json.lockedBy).should.be.an('object').that.have.properties({
      login: { type: 'string', value: fixture.lockedBy.login },
      password: { type: 'string', value: fixture.lockedBy.password },
      profile: { type: 'string', value: fixture.lockedBy.profile },
      userTime: { type: 'time', value: fixture.lockedBy.userTime },
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
      });
      
    }
    json.usersAccess.should.be.an('array').that.have.lengthOf(fixture.usersAccess.length);
    for (let i = 0; i < fixture.usersAccess.length; i += 1) {
      json.usersAccess[i].should.be.an('object').that.have.properties({
        read: { type: 'boolean', value: fixture.usersAccess[i].read },
        changeAccessRight: { type: 'boolean', value: fixture.usersAccess[i].changeAccessRight },
        write: { type: 'boolean', value: fixture.usersAccess[i].write },
      });
      
    }
  });
});

