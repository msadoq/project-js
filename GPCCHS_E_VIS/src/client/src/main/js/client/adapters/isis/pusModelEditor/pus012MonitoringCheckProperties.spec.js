// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus012MonitoringCheckProperties');
const stub = require('./pus012MonitoringCheckProperties.stub')();



describe('protobuf/isis/pusModelEditor/Pus012MonitoringCheckProperties', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012MonitoringCheckProperties.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus012MonitoringCheckProperties');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      rid: { type: 'uinteger', value: stub.rid },
      ridLabel: { type: 'string', value: stub.ridLabel },
      ridStatus: { type: 'uinteger', value: stub.ridStatus },
      actionStatus: { type: 'uinteger', value: stub.actionStatus },
      actionName: { type: 'string', value: stub.actionName },
      mask: { type: 'string', value: stub.mask },
      value: { type: 'string', value: stub.value },
      lastUpdateModeRid: { type: 'uinteger', value: stub.lastUpdateModeRid },
      lastUpdateTimeRid: { type: 'string', value: stub.lastUpdateTimeRid },
      lastUpdateModeActionStatus: { type: 'uinteger', value: stub.lastUpdateModeActionStatus },
      lastUpdateTimeActionStatus: { type: 'string', value: stub.lastUpdateTimeActionStatus },
      lastUpdateModeRidStatus: { type: 'uinteger', value: stub.lastUpdateModeRidStatus },
      lastUpdateTimeRidStatus: { type: 'string', value: stub.lastUpdateTimeRidStatus },
      lastUpdateModeMask: { type: 'uinteger', value: stub.lastUpdateModeMask },
      lastUpdateTimeMask: { type: 'string', value: stub.lastUpdateTimeMask },
      lastUpdateModeValue: { type: 'uinteger', value: stub.lastUpdateModeValue },
      lastUpdateTimeValue: { type: 'string', value: stub.lastUpdateTimeValue },
      actionTcApid: { type: 'uinteger', value: stub.actionTcApid },
      actionTcType: { type: 'uinteger', value: stub.actionTcType },
      actionTcSubType: { type: 'uinteger', value: stub.actionTcSubType },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
    });
    
  });
});
