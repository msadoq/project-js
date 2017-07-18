const ProtoBuf = require('protobufjs');
const adapter = require('./header');
const stub = require('./header.stub');


describe('protobuf/utils/dataControllerUtils/header', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Header.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Header');
  const fixture = stub.getTimebasedQueryHeader();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
