// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014EventReportPacket');
const stub = require('./pus014EventReportPacket.stub')();



describe('protobuf/isis/pusGroundModel/Pus014EventReportPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014EventReportPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014EventReportPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      rid: { type: 'uinteger', value: stub.rid },
      pus014ForwardedPacket: {
        apid: { type: 'uinteger', value: stub.pus014ForwardedPacket.apid },
        forwardingStatus: { type: 'boolean', value: stub.pus014ForwardedPacket.forwardingStatus },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus014ForwardedPacket.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus014ForwardedPacket.pusElement.lastUpdateTime },
        },
      },
      ridLabel: { type: 'string', value: stub.ridLabel },
    });
    
  });
});
