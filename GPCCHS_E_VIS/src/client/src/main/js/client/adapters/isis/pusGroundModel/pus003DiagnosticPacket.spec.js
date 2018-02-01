// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus003DiagnosticPacket');
const stub = require('./pus003DiagnosticPacket.stub')();



describe('protobuf/isis/pusGroundModel/Pus003DiagnosticPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003DiagnosticPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003DiagnosticPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      pus003Packet: {
        sid: { type: 'uinteger', value: stub.pus003Packet.sid },
        validityParameterId: { type: 'uinteger', value: stub.pus003Packet.validityParameterId },
        validityParameterMask: { type: 'string', value: stub.pus003Packet.validityParameterMask },
        validityParameterExpectedValue: { type: 'double', symbol: stub.pus003Packet.validityParameterExpectedValue.toString() },
        collectionInterval: { type: 'duration', value: stub.pus003Packet.collectionInterval },
        status: { type: 'uinteger', value: stub.pus003Packet.status },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: stub.pus003Packet.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: stub.pus003Packet.pusElement.lastUpdateTime },
        },
        sidLabel: { type: 'string', value: stub.pus003Packet.sidLabel },
      },
    });
    
  });
});
