// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus005Model');
const stub = require('./pus005Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus005Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus005Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus005Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      groundDate: { type: 'time', value: stub.groundDate },
      status: { type: 'uinteger', value: stub.status },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus005OnBoardEvent).toHaveLength(stub.pus005OnBoardEvent.length);
    for (let i = 0; i < stub.pus005OnBoardEvent.length; i += 1) {
      expect(decoded.pus005OnBoardEvent[i]).toMatchObject({
        rid: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].rid },
        onBoardStatus: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].onBoardStatus },
        alarmLevel: { type: 'string', value: stub.pus005OnBoardEvent[i].alarmLevel },
        lastUpdateModeRid: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].lastUpdateModeRid },
        lastUpdateTimeRid: { type: 'string', value: stub.pus005OnBoardEvent[i].lastUpdateTimeRid },
        lastUpdateModeOnBoardStatus: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].lastUpdateModeOnBoardStatus },
        lastUpdateTimeOnBoardStatus: { type: 'string', value: stub.pus005OnBoardEvent[i].lastUpdateTimeOnBoardStatus },
        lastUpdateModeAlarmLevel: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].lastUpdateModeAlarmLevel },
        lastUpdateTimeAlarmLevel: { type: 'string', value: stub.pus005OnBoardEvent[i].lastUpdateTimeAlarmLevel },
        serviceApid: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus005OnBoardEvent[i].serviceApidName },
        reportName: { type: 'string', value: stub.pus005OnBoardEvent[i].reportName },
        ridLabel: { type: 'string', value: stub.pus005OnBoardEvent[i].ridLabel },
        reportShortDescription: { type: 'string', value: stub.pus005OnBoardEvent[i].reportShortDescription },
        reportLongDescription: { type: 'string', value: stub.pus005OnBoardEvent[i].reportLongDescription },
        actionName: { type: 'string', value: stub.pus005OnBoardEvent[i].actionName },
        defaultOnBoardStatus: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].defaultOnBoardStatus },
        uniqueId: { type: 'ulong', symbol: `${stub.pus005OnBoardEvent[i].uniqueId}` },
      });
      
    }
  });
});
