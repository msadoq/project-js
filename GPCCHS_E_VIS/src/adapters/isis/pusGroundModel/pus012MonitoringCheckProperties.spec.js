// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus012MonitoringCheckProperties');
const stub = require('./pus012MonitoringCheckProperties.stub')();



describe('protobuf/isis/pusGroundModel/Pus012MonitoringCheckProperties', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus012MonitoringCheckProperties.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus012MonitoringCheckProperties');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      ridStatus: { type: 'uinteger', value: stub.ridStatus },
      actionStatus: { type: 'uinteger', value: stub.actionStatus },
      value: { type: 'double', symbol: stub.value.toString() },
      rid: { type: 'uinteger', value: stub.rid },
      mask: { type: 'string', value: stub.mask },
      actionName: { type: 'string', value: stub.actionName },
      ridLabel: { type: 'string', value: stub.ridLabel },
    });
    
  });
});
