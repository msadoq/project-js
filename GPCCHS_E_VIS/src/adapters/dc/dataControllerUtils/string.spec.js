const ProtoBuf = require('protobufjs');
const adapter = require('./string');
const stub = require('./string.stub');


describe('protobuf/utils/dataControllerUtils/string', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/String.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.String');
  const fixture = stub.getString();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
