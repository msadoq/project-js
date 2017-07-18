// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014TmPacket');
const stub = require('./pus014TmPacket.stub')();



describe('protobuf/isis/pusGroundModel/Pus014TmPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014TmPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014TmPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      serviceTpe: { type: 'uinteger', value: stub.serviceTpe },
      serviceSubType: { type: 'uinteger', value: stub.serviceSubType },
      pus014ForwardedPacket: {
        apid: { type: 'uinteger', value: stub.pus014ForwardedPacket.apid },
        forwardingStatus: { type: 'boolean', value: stub.pus014ForwardedPacket.forwardingStatus },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus014ForwardedPacket.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus014ForwardedPacket.pusElement.lastUpdateTime },
        },
      },
    });
    
  });
});
