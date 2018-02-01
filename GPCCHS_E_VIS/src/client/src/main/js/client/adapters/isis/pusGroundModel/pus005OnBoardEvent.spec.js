// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

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
      onBoardStatus: { type: 'uinteger', value: stub.onBoardStatus },
      alarmLevel: { type: 'string', value: stub.alarmLevel },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      reportIdLabel: { type: 'string', value: stub.reportIdLabel },
    });
    
  });
});
