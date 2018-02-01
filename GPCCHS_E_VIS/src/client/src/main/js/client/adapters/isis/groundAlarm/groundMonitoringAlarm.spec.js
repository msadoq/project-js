// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./groundMonitoringAlarm');
const stub = require('./groundMonitoringAlarm.stub')();



describe('protobuf/isis/groundAlarm/GroundMonitoringAlarm', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GroundMonitoringAlarm.proto`, { keepCase: true })
    .lookup('groundAlarm.protobuf.GroundMonitoringAlarm');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      creationDate: { type: 'time', value: stub.creationDate },
      paramUid: { type: 'long', symbol: `${stub.paramUid}` },
      updateDate: { type: 'time', value: stub.updateDate },
      closingDate: { type: 'time', value: stub.closingDate },
      hasAckRequest: { type: 'boolean', value: stub.hasAckRequest },
      alarmId: { type: 'long', symbol: `${stub.alarmId}` },
      isNominal: { type: 'boolean', value: stub.isNominal },
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
