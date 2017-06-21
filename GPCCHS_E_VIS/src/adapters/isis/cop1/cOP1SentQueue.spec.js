// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1SentQueue');
const { getCOP1SentQueue } = require('../stubs');



describe('protobuf/isis/cop1/COP1SentQueue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1SentQueue.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1SentQueue');
  const fixture = getCOP1SentQueue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      
    });
    
    json.sentQueueElements.should.be.an('array').that.have.lengthOf(fixture.sentQueueElements.length);
    for (let i = 0; i < fixture.sentQueueElements.length; i += 1) {
      json.sentQueueElements[i].should.be.an('object').that.have.properties({
        retransmit_flag: { type: 'uoctet', value: fixture.sentQueueElements[i].retransmit_flag },
        internal_id: { type: 'uinteger', value: fixture.sentQueueElements[i].internal_id },
        num_farm: { type: 'uinteger', value: fixture.sentQueueElements[i].num_farm },
        date: { type: 'string', value: fixture.sentQueueElements[i].date },
        frame_data: { type: 'blob', value: fixture.sentQueueElements[i].frame_data },
        reemission_delay: { type: 'float', value: fixture.sentQueueElements[i].reemission_delay },
      });
      
    }
  });
});
