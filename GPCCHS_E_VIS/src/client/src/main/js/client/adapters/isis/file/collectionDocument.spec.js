// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./collectionDocument');
const stub = require('./collectionDocument.stub')();



describe('protobuf/isis/file/CollectionDocument', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/CollectionDocument.proto`, { keepCase: true })
    .lookup('file.protobuf.CollectionDocument');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'string', value: stub.name },
      externalVersion: (typeof stub.externalVersion === 'undefined')
        ? null
        : { type: 'string', value: stub.externalVersion },
      internalVersion: (typeof stub.internalVersion === 'undefined')
        ? null
        : { type: 'ulong', symbol: `${stub.internalVersion}` },
      uri: { type: 'uri', value: stub.uri },
      brokenLink: { type: 'boolean', value: stub.brokenLink },
      isVersion: { type: 'boolean', value: stub.isVersion },
    });
    
  });
});
