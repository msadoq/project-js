// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus142ParameterMonitoringDefinition');
const stub = require('./pus142ParameterMonitoringDefinition.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus142ParameterMonitoringDefinition', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus142ParameterMonitoringDefinition.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus142ParameterMonitoringDefinition');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      paramMonId: { type: 'uinteger', value: stub.paramMonId },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      lastUpdateModeId: { type: 'uinteger', value: stub.lastUpdateModeId },
      lastUpdateTimeId: { type: 'string', value: stub.lastUpdateTimeId },
      paramMonName: { type: 'string', value: stub.paramMonName },
      fmonId: { type: 'uinteger', value: stub.fmonId },
      fmonIdLabel: { type: 'string', value: stub.fmonIdLabel },
      status: { type: 'uinteger', value: stub.status },
    });
    
  });
});
