// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./briefcase');
const stub = require('./briefcase.stub')();



describe('protobuf/isis/briefcase/Briefcase', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Briefcase.proto`, { keepCase: true })
    .lookup('briefcase.protobuf.Briefcase');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      uid: { type: 'long', symbol: `${stub.uid}` },
      timestamp: { type: 'time', value: stub.timestamp },
      base: {
        author: {
          objectType: {
            area: { type: 'ushort', value: stub.base.author.objectType.area },
            service: { type: 'ushort', value: stub.base.author.objectType.service },
            version: { type: 'uoctet', value: stub.base.author.objectType.version },
            number: { type: 'ushort', value: stub.base.author.objectType.number },
          },
          objectKey: {
            domaineId: { type: 'ushort', value: stub.base.author.objectKey.domaineId },
            uid: { type: 'long', symbol: `${stub.base.author.objectKey.uid}` },
          },
        },
        title: { type: 'string', value: stub.base.title },
        description: { type: 'string', value: stub.base.description },
      },
    });
    
  });
});
