// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const adapter = require('./fMDDocumentProperty');
const stub = require('./fMDDocumentProperty.stub');


describe('protobuf/utils/dataControllerUtils/fMDDocumentProperty', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FMDDocumentProperty.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.FMDDocumentProperty');
  const fixture = stub.getFMDDocumentProperty();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
