const ProtoBuf = require('protobufjs');
const adapter = require('./timeInterval');
const stub = require('./timeInterval.stub');


describe('protobuf/utils/dataControllerUtils/timeInterval', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TimeInterval.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.TimeInterval');
  const fixture = stub.getTimeInterval();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
