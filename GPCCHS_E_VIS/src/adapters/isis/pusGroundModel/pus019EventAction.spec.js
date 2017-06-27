// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus019EventAction');
const stub = require('./pus019EventAction.stub')();



describe('protobuf/isis/pusGroundModel/Pus019EventAction', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus019EventAction.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus019EventAction');
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
      actionTcPacketHeader: { type: 'blob', value: stub.actionTcPacketHeader },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      ridLabel: { type: 'string', value: stub.ridLabel },
    });
    
  });
});
