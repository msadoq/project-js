// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus142ParameterMonitoringDefinition');
const stub = require('./pus142ParameterMonitoringDefinition.stub')();



describe('protobuf/isis/pusGroundModel/Pus142ParameterMonitoringDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142ParameterMonitoringDefinition.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus142ParameterMonitoringDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      paramMonId: { type: 'uinteger', value: stub.paramMonId },
    });
    
  });
});
