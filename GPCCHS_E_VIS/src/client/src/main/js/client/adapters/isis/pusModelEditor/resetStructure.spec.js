// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./resetStructure');
const stub = require('./resetStructure.stub')();



describe('protobuf/isis/pusModelEditor/ResetStructure', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ResetStructure.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.ResetStructure');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      initialisationMode: { type: 'uinteger', value: stub.initialisationMode },
      resetType: { type: 'uinteger', value: stub.resetType },
      date: { type: 'time', value: stub.date },
    });
    
  });
});
