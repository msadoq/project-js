// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus003Model');
const { getPus003Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus003Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003Model');
  const fixture = getPus003Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      numberHkPackets: { type: 'uinteger', value: fixture.numberHkPackets },
      numberDiagPackets: { type: 'uinteger', value: fixture.numberDiagPackets },
      apid: { type: 'uinteger', value: fixture.apid },
      status: { type: 'uinteger', value: fixture.status },
      groundDate: { type: 'time', value: fixture.groundDate },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    
    json.pus003DiagPacket.should.be.an('array').that.have.lengthOf(fixture.pus003DiagPacket.length);
    for (let i = 0; i < fixture.pus003DiagPacket.length; i += 1) {
      json.pus003DiagPacket[i].should.be.an('object').that.have.properties({
        pus003Packet: {
          sid: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.sid },
          validityParameterId: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.validityParameterId },
          validityParameterMask: { type: 'string', value: fixture.pus003DiagPacket[i].pus003Packet.validityParameterMask },
          validityParameterExpectedValue: { type: 'string', value: fixture.pus003DiagPacket[i].pus003Packet.validityParameterExpectedValue },
          collectionInterval: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.collectionInterval },
          status: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.status },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus003DiagPacket[i].pus003Packet.pusElement.lastUpdateTime },
          },
          sidLabel: { type: 'string', value: fixture.pus003DiagPacket[i].pus003Packet.sidLabel },
          isCollectionIntervalSet: { type: 'boolean', value: fixture.pus003DiagPacket[i].pus003Packet.isCollectionIntervalSet },
        },
      });
      
    }
    json.pus003HkPacket.should.be.an('array').that.have.lengthOf(fixture.pus003HkPacket.length);
    for (let i = 0; i < fixture.pus003HkPacket.length; i += 1) {
      json.pus003HkPacket[i].should.be.an('object').that.have.properties({
        generationMode: { type: 'uinteger', value: fixture.pus003HkPacket[i].generationMode },
        pus003Packet: {
          sid: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.sid },
          validityParameterId: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.validityParameterId },
          validityParameterMask: { type: 'string', value: fixture.pus003HkPacket[i].pus003Packet.validityParameterMask },
          validityParameterExpectedValue: { type: 'string', value: fixture.pus003HkPacket[i].pus003Packet.validityParameterExpectedValue },
          collectionInterval: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.collectionInterval },
          status: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.status },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus003HkPacket[i].pus003Packet.pusElement.lastUpdateTime },
          },
          sidLabel: { type: 'string', value: fixture.pus003HkPacket[i].pus003Packet.sidLabel },
          isCollectionIntervalSet: { type: 'boolean', value: fixture.pus003HkPacket[i].pus003Packet.isCollectionIntervalSet },
        },
      });
      
    }
  });
});
