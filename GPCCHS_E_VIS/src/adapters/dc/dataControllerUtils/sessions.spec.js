const ProtoBuf = require('protobufjs');
const adapter = require('./sessions');
const stub = require('./sessions.stub');


describe('protobuf/utils/dataControllerUtils/sessions', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Sessions.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Sessions');
  const fixture = stub.getSessions();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
