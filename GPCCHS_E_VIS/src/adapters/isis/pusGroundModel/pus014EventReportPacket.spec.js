// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus014EventReportPacket');
const { getPus014EventReportPacket } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus014EventReportPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014EventReportPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014EventReportPacket');
  const fixture = getPus014EventReportPacket();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      rid: { type: 'uinteger', value: fixture.rid },
      pus014ForwardedPacket: {
        apid: { type: 'uinteger', value: fixture.pus014ForwardedPacket.apid },
        forwardingStatus: { type: 'boolean', value: fixture.pus014ForwardedPacket.forwardingStatus },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus014ForwardedPacket.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus014ForwardedPacket.pusElement.lastUpdateTime },
        },
      },
      ridLabel: { type: 'string', value: fixture.ridLabel },
    });
    
    
  });
});
