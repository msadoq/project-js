const ProtoBuf = require('protobufjs');
const adapter = require('./onBoardAlarmAckRequest');
const stub = require('./onBoardAlarmAckRequest.stub');


describe('protobuf/utils/dataControllerUtils/onBoardAlarmAckRequest', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OnBoardAlarmAckRequest.proto`, { keepCase: true })
    .lookup('dataControllerUtils.protobuf.OnBoardAlarmAckRequest');
  const fixture = stub.getOnBoardAlarmAckRequest();

  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
