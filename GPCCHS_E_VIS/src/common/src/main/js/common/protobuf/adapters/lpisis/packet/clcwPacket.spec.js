// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/packet/ClcwPacket', () => {
  const fixture = stubData.getClcwPacket();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.packet.ClcwPacket', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.packet.ClcwPacket', buffer);
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

