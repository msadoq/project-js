// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../stubs/index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus003Model', () => {
  const fixture = stubData.getPus003Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus003Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus003Model', buffer);
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
          validityParameterExpectedValue: { type: 'double', symbol: fixture.pus003DiagPacket[i].pus003Packet.validityParameterExpectedValue.toString() },
          collectionInterval: { type: 'duration', value: fixture.pus003DiagPacket[i].pus003Packet.collectionInterval },
          status: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.status },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus003DiagPacket[i].pus003Packet.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus003DiagPacket[i].pus003Packet.pusElement.lastUpdateTime },
          },
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
          validityParameterExpectedValue: { type: 'double', symbol: fixture.pus003HkPacket[i].pus003Packet.validityParameterExpectedValue.toString() },
          collectionInterval: { type: 'duration', value: fixture.pus003HkPacket[i].pus003Packet.collectionInterval },
          status: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.status },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus003HkPacket[i].pus003Packet.pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus003HkPacket[i].pus003Packet.pusElement.lastUpdateTime },
          },
        },
      });
    }
  });
});

