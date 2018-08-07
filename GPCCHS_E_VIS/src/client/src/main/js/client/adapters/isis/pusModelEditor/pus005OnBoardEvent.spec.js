// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus005OnBoardEvent');
const stub = require('./pus005OnBoardEvent.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus005OnBoardEvent', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus005OnBoardEvent.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus005OnBoardEvent');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      rid: { type: 'uinteger', value: stub.rid },
      onBoardStatus: { type: 'uinteger', value: stub.onBoardStatus },
      alarmLevel: { type: 'string', value: stub.alarmLevel },
      lastUpdateModeRid: { type: 'uinteger', value: stub.lastUpdateModeRid },
      lastUpdateTimeRid: { type: 'string', value: stub.lastUpdateTimeRid },
      lastUpdateModeOnBoardStatus: { type: 'uinteger', value: stub.lastUpdateModeOnBoardStatus },
      lastUpdateTimeOnBoardStatus: { type: 'string', value: stub.lastUpdateTimeOnBoardStatus },
      lastUpdateModeAlarmLevel: { type: 'uinteger', value: stub.lastUpdateModeAlarmLevel },
      lastUpdateTimeAlarmLevel: { type: 'string', value: stub.lastUpdateTimeAlarmLevel },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      reportName: { type: 'string', value: stub.reportName },
      ridLabel: { type: 'string', value: stub.ridLabel },
      reportShortDescription: { type: 'string', value: stub.reportShortDescription },
      reportLongDescription: { type: 'string', value: stub.reportLongDescription },
      actionName: { type: 'string', value: stub.actionName },
      defaultOnBoardStatus: { type: 'uinteger', value: stub.defaultOnBoardStatus },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
