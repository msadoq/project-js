// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus019EventAction');
const stub = require('./pus019EventAction.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus019EventAction', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus019EventAction.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus019EventAction');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      rid: { type: 'uinteger', value: stub.rid },
      actionStatus: { type: 'uinteger', value: stub.actionStatus },
      actionTcPacket: { type: 'string', value: stub.actionTcPacket },
      ridLabel: { type: 'string', value: stub.ridLabel },
      lastUpdateModeActionStatus: { type: 'uinteger', value: stub.lastUpdateModeActionStatus },
      lastUpdateTimeActionStatus: { type: 'string', value: stub.lastUpdateTimeActionStatus },
      lastUpdateModeEventActionRid: { type: 'uinteger', value: stub.lastUpdateModeEventActionRid },
      lastUpdateTimeEventActionRid: { type: 'string', value: stub.lastUpdateTimeEventActionRid },
      lastUpdateModeActionTc: { type: 'uinteger', value: stub.lastUpdateModeActionTc },
      lastUpdateTimeActionTc: { type: 'string', value: stub.lastUpdateTimeActionTc },
      packetName: { type: 'string', value: stub.packetName },
      actionName: { type: 'string', value: stub.actionName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      apidName: { type: 'string', value: stub.apidName },
      actionDescription: { type: 'string', value: stub.actionDescription },
      actionTcApid: { type: 'uinteger', value: stub.actionTcApid },
      actionTcType: { type: 'uinteger', value: stub.actionTcType },
      actionTcSubType: { type: 'uinteger', value: stub.actionTcSubType },
    });
    
  });
});
