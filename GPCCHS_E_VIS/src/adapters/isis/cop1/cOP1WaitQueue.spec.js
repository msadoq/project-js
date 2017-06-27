// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./cOP1WaitQueue');
const stub = require('./cOP1WaitQueue.stub')();



describe('protobuf/isis/cop1/COP1WaitQueue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/COP1WaitQueue.proto`, { keepCase: true })
    .lookup('cop1.protobuf.COP1WaitQueue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      internal_id: { type: 'integer', value: stub.internal_id },
      frame_data: { type: 'blob', value: stub.frame_data },
      reemission_delay: { type: 'float', value: stub.reemission_delay },
    });
    
  });
});
