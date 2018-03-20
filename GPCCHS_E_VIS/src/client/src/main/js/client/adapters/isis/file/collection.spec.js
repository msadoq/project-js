// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./collection');
const { getCollection } = require('../stubs');



describe('protobuf/isis/file/Collection', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Collection.proto`, { keepCase: true })
    .lookup('file.protobuf.Collection');
  const fixture = getCollection();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      collectionName: { type: 'string', value: fixture.collectionName },
      collectionDirname: { type: 'uri', value: fixture.collectionDirname },
      virtualName: { type: 'string', value: fixture.virtualName },
      isVirtualFolder: { type: 'boolean', value: fixture.isVirtualFolder },
      collectionRefForVf: (typeof fixture.collectionRefForVf === 'undefined')
        ? null
        : { type: 'long', symbol: `${fixture.collectionRefForVf}` },
      usersAccess: (typeof fixture.usersAccess === 'undefined')
        ? null
        : {
          read: { type: 'boolean', value: fixture.usersAccess.read },
          changeAccessRight: { type: 'boolean', value: fixture.usersAccess.changeAccessRight },
          write: { type: 'boolean', value: fixture.usersAccess.write },
          execute: { type: 'boolean', value: fixture.usersAccess.execute },
        },
      lockedBy: (typeof fixture.lockedBy === 'undefined')
        ? null
        : { type: 'string', value: fixture.lockedBy },
      creatorUser: (typeof fixture.creatorUser === 'undefined')
        ? null
        : { type: 'string', value: fixture.creatorUser },
      accessRightsPropagation: (typeof fixture.accessRightsPropagation === 'undefined')
        ? null
        : { type: 'boolean', value: fixture.accessRightsPropagation },
    });
    
    json.documents.should.be.an('array').that.have.lengthOf(fixture.documents.length);
    for (let i = 0; i < fixture.documents.length; i += 1) {
      json.documents[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.documents[i].name },
        externalVersion: (typeof fixture.documents[i].externalVersion === 'undefined')
          ? null
          : { type: 'string', value: fixture.documents[i].externalVersion },
        internalVersion: (typeof fixture.documents[i].internalVersion === 'undefined')
          ? null
          : { type: 'ulong', symbol: `${fixture.documents[i].internalVersion}` },
        uri: { type: 'uri', value: fixture.documents[i].uri },
        brokenLink: { type: 'boolean', value: fixture.documents[i].brokenLink },
        isVersion: { type: 'boolean', value: fixture.documents[i].isVersion },
      });
      
    }
    json.virtualFolders.should.be.an('array').that.have.lengthOf(fixture.virtualFolders.length);
    for (let i = 0; i < fixture.virtualFolders.length; i += 1) {
      json.virtualFolders[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.virtualFolders[i].name },
        uid: { type: 'long', symbol: `${fixture.virtualFolders[i].uid}` },
      });
      
    }
    json.properties.should.be.an('array').that.have.lengthOf(fixture.properties.length);
    for (let i = 0; i < fixture.properties.length; i += 1) {
      json.properties[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.properties[i].name },
        value: { type: 'double', symbol: fixture.properties[i].value.toString() },
      });
      
    }
  });
});
