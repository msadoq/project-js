// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./sentQueueElement');
const { getSentQueueElement } = require('../stubs');



describe('protobuf/isis/cop1/SentQueueElement', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SentQueueElement.proto`, { keepCase: true })
    .lookup('cop1.protobuf.SentQueueElement');
  const fixture = getSentQueueElement();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      retransmit_flag: { type: 'uoctet', value: fixture.retransmit_flag },
      internal_id: { type: 'uinteger', value: fixture.internal_id },
      num_farm: { type: 'uinteger', value: fixture.num_farm },
      date: { type: 'string', value: fixture.date },
      frame_data: { type: 'blob', value: fixture.frame_data },
      reemission_delay: { type: 'float', value: fixture.reemission_delay },
    });
    
    
  });
});
