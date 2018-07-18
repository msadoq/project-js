// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./document');
const stub = require('./document.stub')();



describe('protobuf/isis/file/Document', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Document.proto`, { keepCase: true })
    .lookup('file.protobuf.Document');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      lockedBy: (typeof stub.lockedBy === 'undefined')
        ? null
        : { type: 'string', value: stub.lockedBy },
      dirname: { type: 'uri', value: stub.dirname },
      usersAccess: (typeof stub.usersAccess === 'undefined')
        ? null
        : {
          read: { type: 'boolean', value: stub.usersAccess.read },
          changeAccessRight: { type: 'boolean', value: stub.usersAccess.changeAccessRight },
          write: { type: 'boolean', value: stub.usersAccess.write },
          execute: { type: 'boolean', value: stub.usersAccess.execute },
        },
      basename: { type: 'string', value: stub.basename },
      creatorUser: (typeof stub.creatorUser === 'undefined')
        ? null
        : { type: 'string', value: stub.creatorUser },
      filesize: { type: 'uinteger', value: stub.filesize },
      confidentialityTracesTrigger: { type: 'boolean', value: stub.confidentialityTracesTrigger },
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
