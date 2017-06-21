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
        rawtc_data: { type: 'blob', value: fixture.proccessedTC[i].rawtc_data },
      });
      json.proccessedTC[i].segment_id.should.be.an('array').that.have.lengthOf(fixture.proccessedTC[i].segment_id.length);
      for (let ii = 0; ii < fixture.proccessedTC[i].segment_id.length; ii += 1) {
        json.proccessedTC[i].segment_id[ii].should.have.properties({
          type: 'uinteger',
          value: fixture.proccessedTC[i].segment_id[ii],
        });
      }
    }
  });
});
