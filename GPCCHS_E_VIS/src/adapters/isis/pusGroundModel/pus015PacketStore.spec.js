// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus015PacketStore');
const { getPus015PacketStore } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus015PacketStore', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015PacketStore.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus015PacketStore');
  const fixture = getPus015PacketStore();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
      id: { type: 'uinteger', value: fixture.id },
      status: { type: 'uinteger', value: fixture.status },
      storageType: { type: 'uinteger', value: fixture.storageType },
      dumpEnabled: { type: 'boolean', value: fixture.dumpEnabled },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      hkStatusParameterName: { type: 'string', value: fixture.hkStatusParameterName },
    });
    
    json.pus015Packet.should.be.an('array').that.have.lengthOf(fixture.pus015Packet.length);
    for (let i = 0; i < fixture.pus015Packet.length; i += 1) {
      json.pus015Packet[i].should.be.an('object').that.have.properties({
        apid: { type: 'uinteger', value: fixture.pus015Packet[i].apid },
        serviceTpe: { type: 'uinteger', value: fixture.pus015Packet[i].serviceTpe },
        serviceSubType: { type: 'uinteger', value: fixture.pus015Packet[i].serviceSubType },
        sid: { type: 'uinteger', value: fixture.pus015Packet[i].sid },
        subsamplingRatio: { type: 'uinteger', value: fixture.pus015Packet[i].subsamplingRatio },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus015Packet[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus015Packet[i].pusElement.lastUpdateTime },
        },
        packetType: { type: 'uinteger', value: fixture.pus015Packet[i].packetType },
        sidLabel: { type: 'string', value: fixture.pus015Packet[i].sidLabel },
      });
      
    }
  });
});
