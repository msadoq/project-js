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
      usersAccess: (typeof stub.usersAccess === 'undefined')
        ? null
        : {
          read: { type: 'boolean', value: stub.usersAccess.read },
          changeAccessRight: { type: 'boolean', value: stub.usersAccess.changeAccessRight },
          write: { type: 'boolean', value: stub.usersAccess.write },
          execute: { type: 'boolean', value: stub.usersAccess.execute },
        },
      lockedBy: (typeof stub.lockedBy === 'undefined')
        ? null
        : { type: 'string', value: stub.lockedBy },
      creatorUser: (typeof stub.creatorUser === 'undefined')
        ? null
        : { type: 'string', value: stub.creatorUser },
      accessRightsPropagation: (typeof stub.accessRightsPropagation === 'undefined')
        ? null
        : { type: 'boolean', value: stub.accessRightsPropagation },
    });
    expect(decoded.documents).toHaveLength(stub.documents.length);
    for (let i = 0; i < stub.documents.length; i += 1) {
      expect(decoded.documents[i]).toMatchObject({
        name: { type: 'string', value: stub.documents[i].name },
        externalVersion: (typeof stub.documents[i].externalVersion === 'undefined')
          ? null
          : { type: 'string', value: stub.documents[i].externalVersion },
        internalVersion: (typeof stub.documents[i].internalVersion === 'undefined')
          ? null
          : { type: 'ulong', symbol: `${stub.documents[i].internalVersion}` },
        uri: { type: 'uri', value: stub.documents[i].uri },
        brokenLink: { type: 'boolean', value: stub.documents[i].brokenLink },
        isVersion: { type: 'boolean', value: stub.documents[i].isVersion },
      });
      
    }
    expect(decoded.virtualFolders).toHaveLength(stub.virtualFolders.length);
    for (let i = 0; i < stub.virtualFolders.length; i += 1) {
      expect(decoded.virtualFolders[i]).toMatchObject({
        name: { type: 'string', value: stub.virtualFolders[i].name },
        uid: { type: 'long', symbol: `${stub.virtualFolders[i].uid}` },
      });
      
    }
    expect(decoded.properties).toHaveLength(stub.properties.length);
    for (let i = 0; i < stub.properties.length; i += 1) {
      expect(decoded.properties[i]).toMatchObject({
        name: { type: 'identifier', value: stub.properties[i].name },
        value: { type: 'double', symbol: stub.properties[i].value.toString() },
      });
      
    }
  });
});
