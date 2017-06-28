const ProtoBuf = require('protobufjs');
const adapter = require('./dcStatus');
const stub = require('./dcStatus.stub');


describe('standalone/proto', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DcStatus.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.DcStatus');
  const fixture = stub.getHealthyDcStatus();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
