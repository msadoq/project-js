// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');



describe('protobuf/lpisis/tcHistory/TC11', () => {
  const fixture = stubData.getTC11();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.tcHistory.TC11', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.tcHistory.TC11', buffer);
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
      subscheduleId: { type: 'uinteger', value: fixture.subscheduleId },
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
    json.timeTaggedTC.should.be.an('array').that.have.lengthOf(fixture.timeTaggedTC.length);
    for (let i = 0; i < fixture.timeTaggedTC.length; i += 1) {
      json.timeTaggedTC[i].should.be.an('object').that.have.properties({
        encodingDate: (typeof fixture.timeTaggedTC[i].encodingDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.timeTaggedTC[i].encodingDate },
        pusHeader: (typeof fixture.timeTaggedTC[i].pusHeader === 'undefined') 
          ? null 
          : {
            versionNumber: { type: 'uoctet', value: fixture.timeTaggedTC[i].pusHeader.versionNumber },
            serviceType: { type: 'uoctet', value: fixture.timeTaggedTC[i].pusHeader.serviceType },
            serviceSubType: { type: 'uoctet', value: fixture.timeTaggedTC[i].pusHeader.serviceSubType },
            subCounter: { type: 'uoctet', value: fixture.timeTaggedTC[i].pusHeader.subCounter },
            destinationId: { type: 'uoctet', value: fixture.timeTaggedTC[i].pusHeader.destinationId },
            time: { type: 'finetime', value: fixture.timeTaggedTC[i].pusHeader.time },
          },
        date: { type: 'time', value: fixture.timeTaggedTC[i].date },
        rawPacket: (typeof fixture.timeTaggedTC[i].rawPacket === 'undefined') 
          ? null 
          : { type: 'blob', value: fixture.timeTaggedTC[i].rawPacket },
        tcId: (typeof fixture.timeTaggedTC[i].tcId === 'undefined') 
          ? null 
          : { type: 'integer', value: fixture.timeTaggedTC[i].tcId },
        tcSourceId: (typeof fixture.timeTaggedTC[i].tcSourceId === 'undefined') 
          ? null 
          : { type: 'uinteger', value: fixture.timeTaggedTC[i].tcSourceId },
        sequenceCount: (typeof fixture.timeTaggedTC[i].sequenceCount === 'undefined') 
          ? null 
          : { type: 'ulong', value: fixture.timeTaggedTC[i].sequenceCount },
      });
      json.timeTaggedTC[i].parameterPhysicalValue.should.be.an('array').that.have.lengthOf(fixture.timeTaggedTC[i].parameterPhysicalValue.length);
      for (let ii = 0; ii < fixture.timeTaggedTC[i].parameterPhysicalValue.length; ii += 1) {
        json.timeTaggedTC[i].parameterPhysicalValue[ii].should.have.properties({
          type: 'string',
          value: fixture.timeTaggedTC[i].parameterPhysicalValue[ii],
        });
      }
    }
    json.parameterPhysicalValue.should.be.an('array').that.have.lengthOf(fixture.parameterPhysicalValue.length);
    for (let i = 0; i < fixture.parameterPhysicalValue.length; i += 1) {
      json.parameterPhysicalValue[i].should.have.properties({
        type: 'string',
        value: fixture.parameterPhysicalValue[i],
      });
    }
  });
});

