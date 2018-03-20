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
const adapter = require('./opAlertConfiguration');
const { getOpAlertConfiguration } = require('../stubs');



describe('protobuf/isis/opAlert/OpAlertConfiguration', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlertConfiguration.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlertConfiguration');
  const fixture = getOpAlertConfiguration();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      maxNumberRetriesPhone: { type: 'integer', value: fixture.maxNumberRetriesPhone },
      delayRetriesPhone: { type: 'duration', value: fixture.delayRetriesPhone },
      maxNumberRetriesAudio: { type: 'identifier', value: fixture.maxNumberRetriesAudio },
      delayRetriesAudio: { type: 'duration', value: fixture.delayRetriesAudio },
      maxNumberRetriesEmail: { type: 'integer', value: fixture.maxNumberRetriesEmail },
      delayRetriesEmail: { type: 'duration', value: fixture.delayRetriesEmail },
      maxNumberRetriesSms: { type: 'integer', value: fixture.maxNumberRetriesSms },
      delayRetriesSms: { type: 'duration', value: fixture.delayRetriesSms },
    });
    
    
  });
});
