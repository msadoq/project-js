// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./pusHeader');
const { getPusHeader } = require('../stubs');



describe('protobuf/isis/tcHistory/PusHeader', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusHeader.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.PusHeader');
  const fixture = getPusHeader();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      versionNumber: { type: 'uoctet', value: fixture.versionNumber },
      sequenceCount: (typeof fixture.sequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.sequenceCount },
      sourceId: (typeof fixture.sourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: fixture.sourceId },
      serviceType: { type: 'uoctet', value: fixture.serviceType },
      serviceSubType: { type: 'uoctet', value: fixture.serviceSubType },
      subCounter: { type: 'uoctet', value: fixture.subCounter },
      destinationId: { type: 'uoctet', value: fixture.destinationId },
      time: { type: 'finetime', value: fixture.time },
    });
    
    
  });
});
