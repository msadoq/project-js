// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');




describe('protobuf/isis/tcHistory/TCImmediate', () => {
  const fixture = stubData.getTCImmediate();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.tcHistory.TCImmediate', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.tcHistory.TCImmediate', buffer);
    json.should.be.an('object').that.have.properties({
      encodingDate: (typeof fixture.encodingDate === 'undefined') 
        ? null 
        : { type: 'time', value: fixture.encodingDate },
      pusHeader: (typeof fixture.pusHeader === 'undefined') 
        ? null 
        : {
          versionNumber: { type: 'uoctet', value: fixture.pusHeader.versionNumber },
          sequenceCount: (typeof fixture.pusHeader.sequenceCount === 'undefined') 
            ? null 
            : { type: 'uinteger', value: fixture.pusHeader.sequenceCount },
          sourceId: (typeof fixture.pusHeader.sourceId === 'undefined') 
            ? null 
            : { type: 'uinteger', value: fixture.pusHeader.sourceId },
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
        : { type: 'ulong', symbol: `${fixture.sequenceCount}` },
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

