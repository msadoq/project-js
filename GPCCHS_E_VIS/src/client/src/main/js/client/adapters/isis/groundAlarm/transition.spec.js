// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./transition');
const stub = require('./transition.stub')();



describe('protobuf/isis/groundAlarm/Transition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Transition.proto`, { keepCase: true })
    .lookup('groundAlarm.protobuf.Transition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      onboardDate: { type: 'time', value: stub.onboardDate },
      groundDate: { type: 'time', value: stub.groundDate },
      convertedValue: { type: 'double', symbol: stub.convertedValue.toString() },
      extractedValue: { type: 'double', symbol: stub.extractedValue.toString() },
      rawValue: { type: 'double', symbol: stub.rawValue.toString() },
      monitoringState: { type: 'string', value: stub.monitoringState },
    });
    
  });
});
