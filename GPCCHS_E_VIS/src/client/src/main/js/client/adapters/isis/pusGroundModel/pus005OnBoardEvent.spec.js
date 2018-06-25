// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus005OnBoardEvent');
const stub = require('./pus005OnBoardEvent.stub')();



describe('protobuf/isis/pusGroundModel/Pus005OnBoardEvent', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus005OnBoardEvent.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus005OnBoardEvent');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      reportId: { type: 'uinteger', value: stub.reportId },
      onBoardStatus: { type: 'uoctet', value: stub.onBoardStatus },
      alarmLevel: { type: 'string', value: stub.alarmLevel },
      pusElement: {
        lastUpdateMode: { type: 'uoctet', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      reportIdLabel: { type: 'string', value: stub.reportIdLabel },
      lastUpdateModeReportId: { type: 'uoctet', value: stub.lastUpdateModeReportId },
      lastUpdateTimeReportId: { type: 'time', value: stub.lastUpdateTimeReportId },
      lastUpdateModeOnBoardStatus: { type: 'uoctet', value: stub.lastUpdateModeOnBoardStatus },
      lastUpdateTimeOnBoardStatus: { type: 'time', value: stub.lastUpdateTimeOnBoardStatus },
      lastUpdateModeAlarmLevel: { type: 'uoctet', value: stub.lastUpdateModeAlarmLevel },
      lastUpdateTimeAlarmLevel: { type: 'time', value: stub.lastUpdateTimeAlarmLevel },
    });
    
  });
});
