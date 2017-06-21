// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus003HkPacket');
const { getPus003HkPacket } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus003HkPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003HkPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003HkPacket');
  const fixture = getPus003HkPacket();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      generationMode: { type: 'uinteger', value: fixture.generationMode },
      pus003Packet: {
        sid: { type: 'uinteger', value: fixture.pus003Packet.sid },
        validityParameterId: { type: 'uinteger', value: fixture.pus003Packet.validityParameterId },
        validityParameterMask: { type: 'string', value: fixture.pus003Packet.validityParameterMask },
        validityParameterExpectedValue: { type: 'double', symbol: fixture.pus003Packet.validityParameterExpectedValue.toString() },
        collectionInterval: { type: 'duration', value: fixture.pus003Packet.collectionInterval },
        status: { type: 'uinteger', value: fixture.pus003Packet.status },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus003Packet.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus003Packet.pusElement.lastUpdateTime },
        },
        sidLabel: { type: 'string', value: fixture.pus003Packet.sidLabel },
      },
    });
    
    
  });
});
