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
      rawtc_data: { type: 'blob', value: fixture.rawtc_data },
    });
    
    json.segment_id.should.be.an('array').that.have.lengthOf(fixture.segment_id.length);
    for (let i = 0; i < fixture.segment_id.length; i += 1) {
      json.segment_id[i].should.have.properties({
        type: 'uinteger',
        value: fixture.segment_id[i],
      });
    }
  });
});
