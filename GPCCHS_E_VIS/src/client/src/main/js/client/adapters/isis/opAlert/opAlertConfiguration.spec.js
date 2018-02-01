// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./opAlertConfiguration');
const stub = require('./opAlertConfiguration.stub')();



describe('protobuf/isis/opAlert/OpAlertConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlertConfiguration.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlertConfiguration');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      numberCalls: { type: 'integer', value: stub.numberCalls },
      alertByPHONE: { type: 'boolean', value: stub.alertByPHONE },
      alertByAUDIO: { type: 'boolean', value: stub.alertByAUDIO },
      alertByEMAIL: { type: 'boolean', value: stub.alertByEMAIL },
      alertBySMS: { type: 'boolean', value: stub.alertBySMS },
      maxNumberRetries: { type: 'integer', value: stub.maxNumberRetries },
      delayRetries: { type: 'duration', value: stub.delayRetries },
    });
    
  });
});
