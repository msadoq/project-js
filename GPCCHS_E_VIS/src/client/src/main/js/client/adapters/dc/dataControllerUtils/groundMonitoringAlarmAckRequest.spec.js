const ProtoBuf = require('protobufjs');
const adapter = require('./groundMonitoringAlarmAckRequest');
const stub = require('./groundMonitoringAlarmAckRequest.stub');


describe('protobuf/utils/dataControllerUtils/groundMonitoringAlarmAckRequest', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GroundMonitoringAlarmAckRequest.proto`, { keepCase: true })
    .lookup('dataControllerUtils.protobuf.GroundMonitoringAlarmAckRequest');
  const fixture = stub.getGroundMonitoringAlarmAckRequest();

  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});
