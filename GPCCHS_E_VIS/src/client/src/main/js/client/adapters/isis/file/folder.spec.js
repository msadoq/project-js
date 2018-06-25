// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./folder');
const stub = require('./folder.stub')();



describe('protobuf/isis/file/Folder', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Folder.proto`, { keepCase: true })
    .lookup('file.protobuf.Folder');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      usersAccess: (typeof stub.usersAccess === 'undefined')
        ? null
        : {
          read: { type: 'boolean', value: stub.usersAccess.read },
          changeAccessRight: { type: 'boolean', value: stub.usersAccess.changeAccessRight },
          write: { type: 'boolean', value: stub.usersAccess.write },
          execute: { type: 'boolean', value: stub.usersAccess.execute },
        },
      path: { type: 'uri', value: stub.path },
      creatorUser: (typeof stub.creatorUser === 'undefined')
        ? null
        : { type: 'string', value: stub.creatorUser },
      documentCount: (typeof stub.documentCount === 'undefined')
        ? null
        : { type: 'long', symbol: `${stub.documentCount}` },
      accessRightsPropagation: (typeof stub.accessRightsPropagation === 'undefined')
        ? null
        : { type: 'boolean', value: stub.accessRightsPropagation },
    });
    expect(decoded.properties).toHaveLength(stub.properties.length);
    for (let i = 0; i < stub.properties.length; i += 1) {
      expect(decoded.properties[i]).toMatchObject({
        name: { type: 'identifier', value: stub.properties[i].name },
        value: { type: 'double', symbol: stub.properties[i].value.toString() },
      });
      
    }
  });
});
