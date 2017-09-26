// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const adapter = require('./queryArguments');
const stub = require('./queryArguments.stub');


describe('protobuf/utils/dataControllerUtils/queryArguments', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/QueryArguments.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.QueryArguments');
  const fixture = stub.getQueryArguments();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
