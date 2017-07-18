const ProtoBuf = require('protobufjs');
const adapter = require('./action');
const stub = require('./action.stub');


describe('standalone/proto', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Action.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Action');
  const fixture = stub.getAddAction();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
