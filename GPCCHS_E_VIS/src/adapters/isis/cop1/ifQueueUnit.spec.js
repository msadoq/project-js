// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./ifQueueUnit');
const { getIfQueueUnit } = require('../stubs');



describe('protobuf/isis/cop1/IfQueueUnit', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IfQueueUnit.proto`, { keepCase: true })
    .lookup('cop1.protobuf.IfQueueUnit');
  const fixture = getIfQueueUnit();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      nb_remaining_bytes: { type: 'integer', value: fixture.nb_remaining_bytes },
      last_state: { type: 'boolean', value: fixture.last_state },
      mnemonic: { type: 'blob', value: fixture.mnemonic },
      nb_emitted_bytes: { type: 'integer', value: fixture.nb_emitted_bytes },
    });
    
    
  });
});
