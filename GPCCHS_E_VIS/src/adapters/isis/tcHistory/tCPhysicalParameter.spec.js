// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./tCPhysicalParameter');
const { getTCPhysicalParameter } = require('../stubs');

const tCDetailType = require('./tCDetailType');

describe('protobuf/isis/tcHistory/TCPhysicalParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/TCPhysicalParameter.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.TCPhysicalParameter');
  const fixture = getTCPhysicalParameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      argumentIdentifier: { type: 'identifier', value: fixture.argumentIdentifier },
      value: { type: 'double', symbol: fixture.value.toString() },
      valueIsRaw: { type: 'boolean', value: fixture.valueIsRaw },
      tcDetailsType: { type: 'enum', value: fixture.tcDetailsType, symbol: tCDetailType[fixture.tcDetailsType] },
      pusHeader: {
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
      rawPacket: { type: 'blob', value: fixture.rawPacket },
    });
    
    
  });
});
