// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./documentValue');
const stub = require('./documentValue.stub')();



describe('protobuf/isis/editor/DocumentValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DocumentValue.proto`, { keepCase: true })
    .lookup('editor.protobuf.DocumentValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      docPath: { type: 'string', value: stub.docPath },
      docId: { type: 'long', symbol: `${stub.docId}` },
      parentDocId: { type: 'long', symbol: `${stub.parentDocId}` },
    });
    
  });
});
