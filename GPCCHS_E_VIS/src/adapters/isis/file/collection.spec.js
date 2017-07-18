// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./collection');
const stub = require('./collection.stub')();



describe('protobuf/isis/file/Collection', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Collection.proto`, { keepCase: true })
    .lookup('file.protobuf.Collection');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      collectionName: { type: 'string', value: stub.collectionName },
      collectionDirname: { type: 'uri', value: stub.collectionDirname },
      virtualName: { type: 'string', value: stub.virtualName },
      isVirtualFolder: { type: 'boolean', value: stub.isVirtualFolder },
      collectionRefForVf: (typeof stub.collectionRefForVf === 'undefined')
        ? null
        : { type: 'long', symbol: `${stub.collectionRefForVf}` },
      user: (typeof stub.user === 'undefined')
        ? null
        : {
          login: { type: 'string', value: stub.user.login },
          password: { type: 'string', value: stub.user.password },
          profile: { type: 'string', value: stub.user.profile },
          userTime: { type: 'time', value: stub.user.userTime },
        },
      lockedBy: (typeof stub.lockedBy === 'undefined')
        ? null
        : {
          login: { type: 'string', value: stub.lockedBy.login },
          password: { type: 'string', value: stub.lockedBy.password },
          profile: { type: 'string', value: stub.lockedBy.profile },
          userTime: { type: 'time', value: stub.lockedBy.userTime },
        },
    });
    expect(decoded.documents).toHaveLength(stub.documents.length);
    for (let i = 0; i < stub.documents.length; i += 1) {
      expect(decoded.documents[i]).toMatchObject({
        name: { type: 'string', value: stub.documents[i].name },
        version: { type: 'string', value: stub.documents[i].version },
        uri: { type: 'uri', value: stub.documents[i].uri },
        brokenLink: { type: 'boolean', value: stub.documents[i].brokenLink },
      });
      
    }
    expect(decoded.virtualFolders).toHaveLength(stub.virtualFolders.length);
    for (let i = 0; i < stub.virtualFolders.length; i += 1) {
      expect(decoded.virtualFolders[i]).toMatchObject({
        name: { type: 'string', value: stub.virtualFolders[i].name },
        uid: { type: 'long', symbol: `${stub.virtualFolders[i].uid}` },
      });
      
    }
    expect(decoded.profilesAccess).toHaveLength(stub.profilesAccess.length);
    for (let i = 0; i < stub.profilesAccess.length; i += 1) {
      expect(decoded.profilesAccess[i]).toMatchObject({
        read: { type: 'boolean', value: stub.profilesAccess[i].read },
        changeAccessRight: { type: 'boolean', value: stub.profilesAccess[i].changeAccessRight },
        write: { type: 'boolean', value: stub.profilesAccess[i].write },
        profile: {
          login: { type: 'string', value: stub.profilesAccess[i].profile.login },
          password: { type: 'string', value: stub.profilesAccess[i].profile.password },
          profile: { type: 'string', value: stub.profilesAccess[i].profile.profile },
          userTime: { type: 'time', value: stub.profilesAccess[i].profile.userTime },
        },
      });
      
    }
    expect(decoded.usersAccess).toHaveLength(stub.usersAccess.length);
    for (let i = 0; i < stub.usersAccess.length; i += 1) {
      expect(decoded.usersAccess[i]).toMatchObject({
        read: { type: 'boolean', value: stub.usersAccess[i].read },
        changeAccessRight: { type: 'boolean', value: stub.usersAccess[i].changeAccessRight },
        write: { type: 'boolean', value: stub.usersAccess[i].write },
        user: {
          login: { type: 'string', value: stub.usersAccess[i].user.login },
          password: { type: 'string', value: stub.usersAccess[i].user.password },
          profile: { type: 'string', value: stub.usersAccess[i].user.profile },
          userTime: { type: 'time', value: stub.usersAccess[i].user.userTime },
        },
      });
      
    }
  });
});
