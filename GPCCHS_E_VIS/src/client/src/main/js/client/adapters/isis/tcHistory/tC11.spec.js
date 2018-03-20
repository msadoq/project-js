// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./tC11');
const { getTC11 } = require('../stubs');



describe('protobuf/isis/tcHistory/TC11', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TC11.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TC11');
  const fixture = getTC11();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
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
        : { type: 'ulong', symbol: `${fixture.sequenceCount}` },
    });
    
    json.timeTaggedTC.should.be.an('array').that.have.lengthOf(fixture.timeTaggedTC.length);
    for (let i = 0; i < fixture.timeTaggedTC.length; i += 1) {
      json.timeTaggedTC[i].should.have.properties({
        type: 'blob',
        value: fixture.timeTaggedTC[i],
      });
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
