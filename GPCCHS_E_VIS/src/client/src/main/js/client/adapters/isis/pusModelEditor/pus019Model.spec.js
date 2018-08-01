// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus019Model');
const stub = require('./pus019Model.stub')();



describe('protobuf/isis/pusModelEditor/Pus019Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus019Model.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus019Model');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      status: { type: 'uinteger', value: stub.status },
      lastUpdateModeServiceStatus: { type: 'uinteger', value: stub.lastUpdateModeServiceStatus },
      lastUpdateTimeServiceStatus: { type: 'string', value: stub.lastUpdateTimeServiceStatus },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    expect(decoded.pus19EventAction).toHaveLength(stub.pus19EventAction.length);
    for (let i = 0; i < stub.pus19EventAction.length; i += 1) {
      expect(decoded.pus19EventAction[i]).toMatchObject({
        apid: { type: 'uinteger', value: stub.pus19EventAction[i].apid },
        rid: { type: 'uinteger', value: stub.pus19EventAction[i].rid },
        actionStatus: { type: 'uinteger', value: stub.pus19EventAction[i].actionStatus },
        actionTcPacket: { type: 'blob', value: stub.pus19EventAction[i].actionTcPacket },
        ridLabel: { type: 'string', value: stub.pus19EventAction[i].ridLabel },
        lastUpdateModeActionStatus: { type: 'uinteger', value: stub.pus19EventAction[i].lastUpdateModeActionStatus },
        lastUpdateTimeActionStatus: { type: 'string', value: stub.pus19EventAction[i].lastUpdateTimeActionStatus },
        lastUpdateModeEventActionRid: { type: 'uinteger', value: stub.pus19EventAction[i].lastUpdateModeEventActionRid },
        lastUpdateTimeEventActionRid: { type: 'string', value: stub.pus19EventAction[i].lastUpdateTimeEventActionRid },
        lastUpdateModeActionTc: { type: 'uinteger', value: stub.pus19EventAction[i].lastUpdateModeActionTc },
        lastUpdateTimeActionTc: { type: 'string', value: stub.pus19EventAction[i].lastUpdateTimeActionTc },
        packetName: { type: 'string', value: stub.pus19EventAction[i].packetName },
        actionName: { type: 'string', value: stub.pus19EventAction[i].actionName },
        uniqueId: { type: 'ulong', symbol: `${stub.pus19EventAction[i].uniqueId}` },
        serviceApid: { type: 'uinteger', value: stub.pus19EventAction[i].serviceApid },
        serviceApidName: { type: 'string', value: stub.pus19EventAction[i].serviceApidName },
        apidName: { type: 'string', value: stub.pus19EventAction[i].apidName },
        actionDescription: { type: 'string', value: stub.pus19EventAction[i].actionDescription },
        selectionStatus: { type: 'string', value: stub.pus19EventAction[i].selectionStatus },
        lastUpdateModeSelectionStatus: { type: 'uinteger', value: stub.pus19EventAction[i].lastUpdateModeSelectionStatus },
        lastUpdateTimeSelectionStatus: { type: 'string', value: stub.pus19EventAction[i].lastUpdateTimeSelectionStatus },
      });
      
    }
  });
});
