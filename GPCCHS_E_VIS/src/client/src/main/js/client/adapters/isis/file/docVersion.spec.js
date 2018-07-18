// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./docVersion');
const stub = require('./docVersion.stub')();



describe('protobuf/isis/file/DocVersion', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DocVersion.proto`, { keepCase: true })
    .lookup('file.protobuf.DocVersion');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      externalVersion: (typeof stub.externalVersion === 'undefined')
        ? null
        : { type: 'string', value: stub.externalVersion },
      internalVersion: { type: 'ulong', symbol: `${stub.internalVersion}` },
      isVirtualVersion: { type: 'boolean', value: stub.isVirtualVersion },
      dirname: { type: 'uri', value: stub.dirname },
      basename: { type: 'string', value: stub.basename },
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
