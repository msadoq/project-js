const ProtoBuf = require('protobufjs');
const adapter = require('./boolean');
const stub = require('./boolean.stub');

describe('protobuf/utils/dataControllerUtils/boolean', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Boolean.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Boolean');
  const fixture = stub.getBoolean();
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = stub.getBooleanDeProtobuf(buffer);
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
