// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus005Model');
const stub = require('./pus005Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus005Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus005Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus005Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      groundDate: { type: 'time', value: stub.groundDate },
      noMonitoringEvents: { type: 'uinteger', value: stub.noMonitoringEvents },
      noEventReports: { type: 'uinteger', value: stub.noEventReports },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus005OnBoardEvent).toHaveLength(stub.pus005OnBoardEvent.length);
    for (let i = 0; i < stub.pus005OnBoardEvent.length; i += 1) {
      expect(decoded.pus005OnBoardEvent[i]).toMatchObject({
        reportId: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].reportId },
        onBoardStatus: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].onBoardStatus },
        alarmLevel: { type: 'string', value: stub.pus005OnBoardEvent[i].alarmLevel },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus005OnBoardEvent[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus005OnBoardEvent[i].pusElement.lastUpdateTime },
        },
        reportIdLabel: { type: 'string', value: stub.pus005OnBoardEvent[i].reportIdLabel },
      });
      
    }
  });
});
