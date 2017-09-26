// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const adapter = require('./fMDCreateDocument');
const stub = require('./fMDCreateDocument.stub');


describe('protobuf/utils/dataControllerUtils/fMDCreateDocument', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FMDCreateDocument.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.FMDCreateDocument');
  const fixture = stub.getFMDCreateDocument();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
