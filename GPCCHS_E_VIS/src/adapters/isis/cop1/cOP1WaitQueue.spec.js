// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./cOP1WaitQueue');
const { getCOP1WaitQueue } = require('../stubs');



describe('protobuf/isis/cop1/COP1WaitQueue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1WaitQueue.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1WaitQueue');
  const fixture = getCOP1WaitQueue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      internal_id: { type: 'integer', value: fixture.internal_id },
      frame_data: { type: 'blob', value: fixture.frame_data },
      reemission_delay: { type: 'float', value: fixture.reemission_delay },
    });
    
    
  });
});
