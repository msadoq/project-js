// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./sentQueueElement');
const stub = require('./sentQueueElement.stub')();



describe('protobuf/isis/cop1/SentQueueElement', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SentQueueElement.proto`, { keepCase: true })
    .lookup('cop1.protobuf.SentQueueElement');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      retransmit_flag: { type: 'uoctet', value: stub.retransmit_flag },
      internal_id: { type: 'uinteger', value: stub.internal_id },
      num_farm: { type: 'uinteger', value: stub.num_farm },
      date: { type: 'string', value: stub.date },
      frame_data: { type: 'blob', value: stub.frame_data },
      reemission_delay: { type: 'float', value: stub.reemission_delay },
    });
    
  });
});
