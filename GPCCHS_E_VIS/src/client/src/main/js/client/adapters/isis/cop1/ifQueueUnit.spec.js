// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./ifQueueUnit');
const stub = require('./ifQueueUnit.stub')();



describe('protobuf/isis/cop1/IfQueueUnit', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/IfQueueUnit.proto`, { keepCase: true })
    .lookup('cop1.protobuf.IfQueueUnit');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      nb_remaining_bytes: { type: 'integer', value: stub.nb_remaining_bytes },
      last_state: { type: 'boolean', value: stub.last_state },
      mnemonic: { type: 'blob', value: stub.mnemonic },
      nb_emitted_bytes: { type: 'integer', value: stub.nb_emitted_bytes },
    });
    
  });
});
