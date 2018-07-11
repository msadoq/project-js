// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011SubSchedule');
const stub = require('./pus011SubSchedule.stub')();



describe('protobuf/isis/pusModelEditor/Pus011SubSchedule', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011SubSchedule.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus011SubSchedule');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      ssId: { type: 'uinteger', value: stub.ssId },
      status: { type: 'uinteger', value: stub.status },
      ssIdLabel: { type: 'string', value: stub.ssIdLabel },
      lastUpdateModeSubScheduleId: { type: 'uinteger', value: stub.lastUpdateModeSubScheduleId },
      lastUpdateTimeSubscheduleId: { type: 'string', value: stub.lastUpdateTimeSubscheduleId },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'string', value: stub.lastUpdateTimeStatus },
      executionTimeFirstTc: { type: 'string', value: stub.executionTimeFirstTc },
      lastUpdateModeExecTimeFirstTc: { type: 'uinteger', value: stub.lastUpdateModeExecTimeFirstTc },
      lastUpdateTimeExecTimeFirstTc: { type: 'string', value: stub.lastUpdateTimeExecTimeFirstTc },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
