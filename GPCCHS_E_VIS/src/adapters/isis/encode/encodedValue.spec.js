// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./encodedValue');
const stub = require('./encodedValue.stub')();



describe('protobuf/isis/encode/EncodedValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodedValue.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodedValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      rawValue: { type: 'blob', value: stub.rawValue },
      sequenceCount: (typeof stub.sequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.sequenceCount },
      definitionId: { type: 'long', symbol: `${stub.definitionId}` },
    });
    
  });
});
