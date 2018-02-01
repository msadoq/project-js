// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus019Model');
const stub = require('./pus019Model.stub')();



describe('protobuf/isis/pusGroundModel/Pus019Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus019Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus019Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      noOfEventActions: { type: 'uinteger', value: stub.noOfEventActions },
      groundDate: { type: 'time', value: stub.groundDate },
      apid: { type: 'uinteger', value: stub.apid },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: stub.status },
    });
    expect(decoded.pus19EventAction).toHaveLength(stub.pus19EventAction.length);
    for (let i = 0; i < stub.pus19EventAction.length; i += 1) {
      expect(decoded.pus19EventAction[i]).toMatchObject({
        apid: { type: 'uinteger', value: stub.pus19EventAction[i].apid },
        rid: { type: 'uinteger', value: stub.pus19EventAction[i].rid },
        actionStatus: { type: 'uinteger', value: stub.pus19EventAction[i].actionStatus },
        actionTcPacketHeader: { type: 'blob', value: stub.pus19EventAction[i].actionTcPacketHeader },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus19EventAction[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus19EventAction[i].pusElement.lastUpdateTime },
        },
        ridLabel: { type: 'string', value: stub.pus19EventAction[i].ridLabel },
      });
      
    }
  });
});
