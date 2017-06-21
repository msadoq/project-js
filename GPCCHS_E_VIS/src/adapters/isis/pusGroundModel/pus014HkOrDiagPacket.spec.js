// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pus014HkOrDiagPacket');
const { getPus014HkOrDiagPacket } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus014HkOrDiagPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014HkOrDiagPacket.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus014HkOrDiagPacket');
  const fixture = getPus014HkOrDiagPacket();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      subsamplingRatio: { type: 'uinteger', value: fixture.subsamplingRatio },
      sid: { type: 'uinteger', value: fixture.sid },
      pus014ForwardedPacket: {
        apid: { type: 'uinteger', value: fixture.pus014ForwardedPacket.apid },
        forwardingStatus: { type: 'boolean', value: fixture.pus014ForwardedPacket.forwardingStatus },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus014ForwardedPacket.pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus014ForwardedPacket.pusElement.lastUpdateTime },
        },
      },
      sidLabel: { type: 'string', value: fixture.sidLabel },
    });
    
    
  });
});
