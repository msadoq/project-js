// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./transportedGroundAlarm');
const stub = require('./transportedGroundAlarm.stub')();



describe('protobuf/isis/groundAlarm/TransportedGroundAlarm', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TransportedGroundAlarm.proto`, { keepCase: true })
    .lookup('groundAlarm.protobuf.TransportedGroundAlarm');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      hasAckRequest: { type: 'boolean', value: stub.hasAckRequest },
      paramUid: { type: 'long', symbol: `${stub.paramUid}` },
    });
    expect(decoded.transitions).toHaveLength(stub.transitions.length);
    for (let i = 0; i < stub.transitions.length; i += 1) {
      expect(decoded.transitions[i]).toMatchObject({
        onboardDate: { type: 'time', value: stub.transitions[i].onboardDate },
        groundDate: { type: 'time', value: stub.transitions[i].groundDate },
        convertedValue: { type: 'double', symbol: stub.transitions[i].convertedValue.toString() },
        extractedValue: { type: 'double', symbol: stub.transitions[i].extractedValue.toString() },
        rawValue: { type: 'double', symbol: stub.transitions[i].rawValue.toString() },
        monitoringState: { type: 'string', value: stub.transitions[i].monitoringState },
      });
      
    }
  });
});
