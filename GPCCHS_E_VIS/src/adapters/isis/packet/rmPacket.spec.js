// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./rmPacket');
const { getRmPacket } = require('../stubs');



describe('protobuf/isis/packet/RmPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/RmPacket.proto`, { keepCase: true })
    .lookup('packet.protobuf.RmPacket');
  const fixture = getRmPacket();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      groundDate: { type: 'time', value: fixture.groundDate },
      onboardDate: { type: 'time', value: fixture.onboardDate },
      apid: { type: 'ushort', value: fixture.apid },
      service: { type: 'uoctet', value: fixture.service },
      subService: { type: 'uoctet', value: fixture.subService },
      destinationId: (typeof fixture.destinationId === 'undefined')
        ? null
        : { type: 'uoctet', value: fixture.destinationId },
      isDecommuted: { type: 'boolean', value: fixture.isDecommuted },
      primaryHeaderSize: { type: 'uoctet', value: fixture.primaryHeaderSize },
      secondaryHeaderSize: { type: 'uoctet', value: fixture.secondaryHeaderSize },
      isNominal: { type: 'boolean', value: fixture.isNominal },
      rawData: { type: 'blob', value: fixture.rawData },
    });
    
    
  });
});
