// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');


describe('protobuf/lpisis/pusGroundModel/Pus015Model', () => {
  const fixture = stubData.getPus015Model();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.pusGroundModel.Pus015Model', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.pusGroundModel.Pus015Model', buffer);
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noPacketStores: { type: 'uinteger', value: fixture.noPacketStores },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
    });
    json.pus015PacketStore.should.be.an('array').that.have.lengthOf(fixture.pus015PacketStore.length);
    for (let i = 0; i < fixture.pus015PacketStore.length; i += 1) {
      json.pus015PacketStore[i].should.be.an('object').that.have.properties({
        name: { type: 'string', value: fixture.pus015PacketStore[i].name },
        id: { type: 'uinteger', value: fixture.pus015PacketStore[i].id },
        status: { type: 'uinteger', value: fixture.pus015PacketStore[i].status },
        storageType: { type: 'uinteger', value: fixture.pus015PacketStore[i].storageType },
        dumpEnabled: { type: 'boolean', value: fixture.pus015PacketStore[i].dumpEnabled },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus015PacketStore[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus015PacketStore[i].pusElement.lastUpdateTime },
        },
        hkStatusParameterName: { type: 'string', value: fixture.pus015PacketStore[i].hkStatusParameterName },
      });
      json.pus015PacketStore[i].pus015Packet.should.be.an('array').that.have.lengthOf(fixture.pus015PacketStore[i].pus015Packet.length);
      for (let ii = 0; ii < fixture.pus015PacketStore[i].pus015Packet.length; ii += 1) {
        json.pus015PacketStore[i].pus015Packet[ii].should.be.an('object').that.have.properties({
          apid: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].apid },
          serviceTpe: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].serviceTpe },
          serviceSubType: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].serviceSubType },
          sid: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].sid },
          subsamplingRatio: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].subsamplingRatio },
          pusElement: {
            lastUpdateMode: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].pusElement.lastUpdateMode },
            lastUpdateTime: { type: 'time', value: fixture.pus015PacketStore[i].pus015Packet[ii].pusElement.lastUpdateTime },
          },
          packetType: { type: 'uinteger', value: fixture.pus015PacketStore[i].pus015Packet[ii].packetType },
        });
      }
    }
  });
});

