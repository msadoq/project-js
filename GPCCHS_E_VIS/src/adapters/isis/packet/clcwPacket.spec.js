// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./clcwPacket');
const stub = require('./clcwPacket.stub')();



describe('protobuf/isis/packet/ClcwPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ClcwPacket.proto`, { keepCase: true })
    .lookup('packet.protobuf.ClcwPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      groundDate: { type: 'time', value: stub.groundDate },
      onboardDate: { type: 'time', value: stub.onboardDate },
      apid: { type: 'ushort', value: stub.apid },
      service: { type: 'uoctet', value: stub.service },
      subService: { type: 'uoctet', value: stub.subService },
      destinationId: (typeof stub.destinationId === 'undefined')
        ? null
        : { type: 'uoctet', value: stub.destinationId },
      isDecommuted: { type: 'boolean', value: stub.isDecommuted },
      primaryHeaderSize: { type: 'uoctet', value: stub.primaryHeaderSize },
      secondaryHeaderSize: { type: 'uoctet', value: stub.secondaryHeaderSize },
      isNominal: { type: 'boolean', value: stub.isNominal },
      rawData: { type: 'blob', value: stub.rawData },
    });
    
  });
});
