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
const adapter = require('./proccessedTC');
const { getProccessedTC } = require('../stubs');



describe('protobuf/isis/cop1/ProccessedTC', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProccessedTC.proto`, { keepCase: true })
    .lookup('cop1.protobuf.ProccessedTC');
  const fixture = getProccessedTC();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      tCID: { type: 'identifier', value: fixture.tCID },
      receivedDate: { type: 'time', value: fixture.receivedDate },
      mnemo: { type: 'identifier', value: fixture.mnemo },
      segment_id: { type: 'uinteger', value: fixture.segment_id },
      rawtc_data: { type: 'blob', value: fixture.rawtc_data },
      aPID: { type: 'uinteger', value: fixture.aPID },
      definitionID: { type: 'uinteger', value: fixture.definitionID },
      sourceID: { type: 'integer', value: fixture.sourceID },
      delay: { type: 'float', value: fixture.delay },
      mapID: { type: 'uinteger', value: fixture.mapID },
    });
    
    
  });
});
