// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cOP1SentQueue');
const stub = require('./cOP1SentQueue.stub')();



describe('protobuf/isis/cop1/COP1SentQueue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1SentQueue.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1SentQueue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    expect(decoded.sentQueueElements).toHaveLength(stub.sentQueueElements.length);
    for (let i = 0; i < stub.sentQueueElements.length; i += 1) {
      expect(decoded.sentQueueElements[i]).toMatchObject({
        retransmit_flag: { type: 'uoctet', value: stub.sentQueueElements[i].retransmit_flag },
        internal_id: { type: 'uinteger', value: stub.sentQueueElements[i].internal_id },
        num_farm: { type: 'uinteger', value: stub.sentQueueElements[i].num_farm },
        date: { type: 'string', value: stub.sentQueueElements[i].date },
        frame_data: { type: 'blob', value: stub.sentQueueElements[i].frame_data },
        reemission_delay: { type: 'float', value: stub.sentQueueElements[i].reemission_delay },
      });
      
    }
  });
});
