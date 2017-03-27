// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/tcHistory/TC13', () => {
  const fixture = stubData.getTC13();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.tcHistory.TC13', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.tcHistory.TC13', buffer);
    json.should.be.an('object').that.have.properties({
      encodingDate: (typeof fixture.encodingDate === 'undefined') 
        ? null 
        : { type: 'time', value: fixture.encodingDate },
      pusHeader: (typeof fixture.pusHeader === 'undefined') 
        ? null 
        : {
          versionNumber: { type: 'uoctet', value: fixture.pusHeader.versionNumber },
          serviceType: { type: 'uoctet', value: fixture.pusHeader.serviceType },
          serviceSubType: { type: 'uoctet', value: fixture.pusHeader.serviceSubType },
          subCounter: { type: 'uoctet', value: fixture.pusHeader.subCounter },
          destinationId: { type: 'uoctet', value: fixture.pusHeader.destinationId },
          time: { type: 'finetime', value: fixture.pusHeader.time },
        },
      rawPacket: (typeof fixture.rawPacket === 'undefined') 
        ? null 
        : { type: 'blob', value: fixture.rawPacket },
      tcId: (typeof fixture.tcId === 'undefined') 
        ? null 
        : { type: 'integer', value: fixture.tcId },
      tcSourceId: (typeof fixture.tcSourceId === 'undefined') 
        ? null 
        : { type: 'uinteger', value: fixture.tcSourceId },
      sequenceCount: (typeof fixture.sequenceCount === 'undefined') 
        ? null 
        : { type: 'ulong', value: fixture.sequenceCount },
    });
    json.parameterPhysicalValue.should.be.an('array').that.have.lengthOf(fixture.parameterPhysicalValue.length);
    for (let i = 0; i < fixture.parameterPhysicalValue.length; i += 1) {
      json.parameterPhysicalValue[i].should.have.properties({
        type: 'string',
        value: fixture.parameterPhysicalValue[i],
      });
    }
  });
});

