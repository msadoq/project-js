// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./ifQueueElement');
const { getIfQueueElement } = require('../stubs');



describe('protobuf/isis/cop1/IfQueueElement', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IfQueueElement.proto`, { keepCase: true })
    .lookup('cop1.protobuf.IfQueueElement');
  const fixture = getIfQueueElement();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      number: { type: 'integer', value: fixture.number },
      reemission_delay: { type: 'float', value: fixture.reemission_delay },
      date: { type: 'string', value: fixture.date },
      segment_data: { type: 'blob', value: fixture.segment_data },
      index: { type: 'integer', value: fixture.index },
      priority: { type: 'integer', value: fixture.priority },
    });
    
    json.units.should.be.an('array').that.have.lengthOf(fixture.units.length);
    for (let i = 0; i < fixture.units.length; i += 1) {
      json.units[i].should.be.an('object').that.have.properties({
        nb_remaining_bytes: { type: 'integer', value: fixture.units[i].nb_remaining_bytes },
        last_state: { type: 'boolean', value: fixture.units[i].last_state },
        mnemonic: { type: 'blob', value: fixture.units[i].mnemonic },
        nb_emitted_bytes: { type: 'integer', value: fixture.units[i].nb_emitted_bytes },
      });
      
    }
  });
});
