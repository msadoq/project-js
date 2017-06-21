// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus015Packet');
const { getPus015Packet } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus015Packet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus015Packet.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus015Packet');
  const fixture = getPus015Packet();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      apid: { type: 'uinteger', value: fixture.apid },
      serviceTpe: { type: 'uinteger', value: fixture.serviceTpe },
      serviceSubType: { type: 'uinteger', value: fixture.serviceSubType },
      sid: { type: 'uinteger', value: fixture.sid },
      subsamplingRatio: { type: 'uinteger', value: fixture.subsamplingRatio },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      packetType: { type: 'uinteger', value: fixture.packetType },
      sidLabel: { type: 'string', value: fixture.sidLabel },
    });
    
    
  });
});
