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
const adapter = require('./gPMCC1State');
const { getGPMCC1State } = require('../stubs');



describe('protobuf/isis/cop1/GPMCC1State', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/GPMCC1State.proto`, { keepCase: true })
    .lookup('cop1.protobuf.GPMCC1State');
  const fixture = getGPMCC1State();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.proccessedTC.should.be.an('array').that.have.lengthOf(fixture.proccessedTC.length);
    for (let i = 0; i < fixture.proccessedTC.length; i += 1) {
      json.proccessedTC[i].should.be.an('object').that.have.properties({
        tCID: { type: 'identifier', value: fixture.proccessedTC[i].tCID },
        receivedDate: { type: 'time', value: fixture.proccessedTC[i].receivedDate },
        mnemo: { type: 'identifier', value: fixture.proccessedTC[i].mnemo },
        segment_id: { type: 'uinteger', value: fixture.proccessedTC[i].segment_id },
        rawtc_data: { type: 'blob', value: fixture.proccessedTC[i].rawtc_data },
        aPID: { type: 'uinteger', value: fixture.proccessedTC[i].aPID },
        definitionID: { type: 'uinteger', value: fixture.proccessedTC[i].definitionID },
        sourceID: { type: 'integer', value: fixture.proccessedTC[i].sourceID },
        delay: { type: 'float', value: fixture.proccessedTC[i].delay },
        mapID: { type: 'uinteger', value: fixture.proccessedTC[i].mapID },
      });
      
    }
  });
});
