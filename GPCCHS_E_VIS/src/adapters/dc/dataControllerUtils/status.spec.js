const ProtoBuf = require('protobufjs');
const adapter = require('./status');
const stub = require('./status.stub');


describe('protobuf/utils/dataControllerUtils/status', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Status.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Status');
  const fixture = stub.getSuccessStatus();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
