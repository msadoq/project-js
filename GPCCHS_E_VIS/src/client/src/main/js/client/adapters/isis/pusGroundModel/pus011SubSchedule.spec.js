// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011SubSchedule');
const stub = require('./pus011SubSchedule.stub')();



describe('protobuf/isis/pusGroundModel/Pus011SubSchedule', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011SubSchedule.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011SubSchedule');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      ssId: { type: 'uinteger', value: stub.ssId },
      status: { type: 'uinteger', value: stub.status },
      executionTimeFirstTc: { type: 'time', value: stub.executionTimeFirstTc },
      apid: { type: 'uinteger', value: stub.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      groundDate: { type: 'time', value: stub.groundDate },
      ssIdLabel: { type: 'string', value: stub.ssIdLabel },
      lastUpdateModeStatus: { type: 'uinteger', value: stub.lastUpdateModeStatus },
      lastUpdateTimeStatus: { type: 'time', value: stub.lastUpdateTimeStatus },
      lastUpdateModeExecTimeFirstTc: { type: 'uinteger', value: stub.lastUpdateModeExecTimeFirstTc },
      lastUpdateTimeExecTimeFirstTc: { type: 'time', value: stub.lastUpdateTimeExecTimeFirstTc },
      lastUpdateModeSsId: { type: 'uinteger', value: stub.lastUpdateModeSsId },
      lastUpdateTimeSsId: { type: 'time', value: stub.lastUpdateTimeSsId },
    });
    
  });
});
