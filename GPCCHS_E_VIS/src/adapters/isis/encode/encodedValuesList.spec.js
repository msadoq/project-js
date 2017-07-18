// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./encodedValuesList');
const stub = require('./encodedValuesList.stub')();



describe('protobuf/isis/encode/EncodedValuesList', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodedValuesList.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodedValuesList');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      largeSequenceCount: (typeof stub.largeSequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.largeSequenceCount },
    });
    expect(decoded.encodedValues).toHaveLength(stub.encodedValues.length);
    for (let i = 0; i < stub.encodedValues.length; i += 1) {
      expect(decoded.encodedValues[i]).toMatchObject({
        rawValue: { type: 'blob', value: stub.encodedValues[i].rawValue },
        sequenceCount: (typeof stub.encodedValues[i].sequenceCount === 'undefined')
          ? null
          : { type: 'uinteger', value: stub.encodedValues[i].sequenceCount },
        definitionId: { type: 'long', symbol: `${stub.encodedValues[i].definitionId}` },
      });
      
    }
  });
});
