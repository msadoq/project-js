// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus015Model');
const { getPus015Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus015Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus015Model');
  const fixture = getPus015Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noPacketStores: { type: 'uinteger', value: fixture.noPacketStores },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
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
          sidLabel: { type: 'string', value: fixture.pus015PacketStore[i].pus015Packet[ii].sidLabel },
        });
        
      }
    }
  });
});
