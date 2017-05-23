// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/tcHistory/TCLong', () => {
  const fixture = stubData.getTCLong();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.tcHistory.TCLong', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.tcHistory.TCLong', buffer);
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
        : { type: 'ulong', symbol: `${fixture.sequenceCount}` },
    });
    json.tc13.should.be.an('array').that.have.lengthOf(fixture.tc13.length);
    for (let i = 0; i < fixture.tc13.length; i += 1) {
      json.tc13[i].should.be.an('object').that.have.properties({
        encodingDate: (typeof fixture.tc13[i].encodingDate === 'undefined')
          ? null
          : { type: 'time', value: fixture.tc13[i].encodingDate },
        pusHeader: (typeof fixture.tc13[i].pusHeader === 'undefined')
          ? null
          : {
            versionNumber: { type: 'uoctet', value: fixture.tc13[i].pusHeader.versionNumber },
            serviceType: { type: 'uoctet', value: fixture.tc13[i].pusHeader.serviceType },
            serviceSubType: { type: 'uoctet', value: fixture.tc13[i].pusHeader.serviceSubType },
            subCounter: { type: 'uoctet', value: fixture.tc13[i].pusHeader.subCounter },
            destinationId: { type: 'uoctet', value: fixture.tc13[i].pusHeader.destinationId },
            time: { type: 'finetime', value: fixture.tc13[i].pusHeader.time },
          },
        rawPacket: (typeof fixture.tc13[i].rawPacket === 'undefined')
          ? null
          : { type: 'blob', value: fixture.tc13[i].rawPacket },
        tcId: (typeof fixture.tc13[i].tcId === 'undefined')
          ? null
          : { type: 'integer', value: fixture.tc13[i].tcId },
        tcSourceId: (typeof fixture.tc13[i].tcSourceId === 'undefined')
          ? null
          : { type: 'uinteger', value: fixture.tc13[i].tcSourceId },
        sequenceCount: (typeof fixture.tc13[i].sequenceCount === 'undefined')
          ? null
          : { type: 'ulong', symbol: `${fixture.tc13[i].sequenceCount}` },
      });
      json.tc13[i].parameterPhysicalValue.should.be.an('array').that.have.lengthOf(fixture.tc13[i].parameterPhysicalValue.length);
      for (let ii = 0; ii < fixture.tc13[i].parameterPhysicalValue.length; ii += 1) {
        json.tc13[i].parameterPhysicalValue[ii].should.have.properties({
          type: 'string',
          value: fixture.tc13[i].parameterPhysicalValue[ii],
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

