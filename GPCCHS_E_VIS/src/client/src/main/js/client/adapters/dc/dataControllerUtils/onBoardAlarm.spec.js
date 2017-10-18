const ProtoBuf = require('protobufjs');
const adapter = require('./onBoardAlarm');
const stub = require('./onBoardAlarm.stub');


describe('protobuf/utils/dataControllerUtils/onBoardAlarm', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OnBoardAlarm.proto`, { keepCase: true })
    .lookup('dataControllerUtils.protobuf.OnBoardAlarm');
  const fixture = stub.getOnBoardAlarm();

  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
