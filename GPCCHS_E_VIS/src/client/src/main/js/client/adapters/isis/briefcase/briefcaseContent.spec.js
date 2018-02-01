// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./briefcaseContent');
const stub = require('./briefcaseContent.stub')();



describe('protobuf/isis/briefcase/BriefcaseContent', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/BriefcaseContent.proto`, { keepCase: true })
    .lookup('briefcase.protobuf.BriefcaseContent');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      author: {
        objectType: {
          area: { type: 'ushort', value: stub.author.objectType.area },
          service: { type: 'ushort', value: stub.author.objectType.service },
          version: { type: 'uoctet', value: stub.author.objectType.version },
          number: { type: 'ushort', value: stub.author.objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: stub.author.objectKey.domaineId },
          uid: { type: 'long', symbol: `${stub.author.objectKey.uid}` },
        },
      },
      title: { type: 'string', value: stub.title },
      description: { type: 'string', value: stub.description },
    });
    expect(decoded.link).toHaveLength(stub.link.length);
    for (let i = 0; i < stub.link.length; i += 1) {
      expect(decoded.link[i]).toMatchObject({
        objectType: {
          area: { type: 'ushort', value: stub.link[i].objectType.area },
          service: { type: 'ushort', value: stub.link[i].objectType.service },
          version: { type: 'uoctet', value: stub.link[i].objectType.version },
          number: { type: 'ushort', value: stub.link[i].objectType.number },
        },
        objectKey: {
          domaineId: { type: 'ushort', value: stub.link[i].objectKey.domaineId },
          uid: { type: 'long', symbol: `${stub.link[i].objectKey.uid}` },
        },
      });
      
    }
  });
});
