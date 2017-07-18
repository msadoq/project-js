// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./transportedDocuments');
const stub = require('./transportedDocuments.stub')();



describe('protobuf/isis/editor/TransportedDocuments', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TransportedDocuments.proto`, { keepCase: true })
    .lookup('editor.protobuf.TransportedDocuments');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.documents).toHaveLength(stub.documents.length);
    for (let i = 0; i < stub.documents.length; i += 1) {
      expect(decoded.documents[i]).toMatchObject({
        docPath: { type: 'string', value: stub.documents[i].docPath },
        docId: { type: 'long', symbol: `${stub.documents[i].docId}` },
        parentDocId: { type: 'long', symbol: `${stub.documents[i].parentDocId}` },
      });
      
    }
  });
});
