// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./ifQueueElement');
const stub = require('./ifQueueElement.stub')();



describe('protobuf/isis/cop1/IfQueueElement', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IfQueueElement.proto`, { keepCase: true })
    .lookup('cop1.protobuf.IfQueueElement');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      number: { type: 'integer', value: stub.number },
      reemission_delay: { type: 'float', value: stub.reemission_delay },
      date: { type: 'string', value: stub.date },
      segment_data: { type: 'blob', value: stub.segment_data },
      index: { type: 'integer', value: stub.index },
      priority: { type: 'integer', value: stub.priority },
    });
    expect(decoded.units).toHaveLength(stub.units.length);
    for (let i = 0; i < stub.units.length; i += 1) {
      expect(decoded.units[i]).toMatchObject({
        nb_remaining_bytes: { type: 'integer', value: stub.units[i].nb_remaining_bytes },
        last_state: { type: 'boolean', value: stub.units[i].last_state },
        mnemonic: { type: 'blob', value: stub.units[i].mnemonic },
        nb_emitted_bytes: { type: 'integer', value: stub.units[i].nb_emitted_bytes },
      });
      
    }
  });
});
