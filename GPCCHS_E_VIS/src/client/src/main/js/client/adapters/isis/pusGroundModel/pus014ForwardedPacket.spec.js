// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014ForwardedPacket');
const stub = require('./pus014ForwardedPacket.stub')();



describe('protobuf/isis/pusGroundModel/Pus014ForwardedPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014ForwardedPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014ForwardedPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      forwardingStatus: { type: 'boolean', value: stub.forwardingStatus },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
    });
    
  });
});
