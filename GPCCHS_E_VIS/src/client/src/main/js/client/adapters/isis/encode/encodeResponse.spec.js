// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./encodeResponse');
const stub = require('./encodeResponse.stub')();

const encodedType = require('./encodedType');

describe('protobuf/isis/encode/EncodeResponse', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeResponse.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeResponse');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      encodedType: { type: 'enum', value: stub.encodedType, symbol: encodedType[stub.encodedType] },
      encodedValues: {
        largeSequenceCount: (typeof stub.encodedValues.largeSequenceCount === 'undefined')
          ? null
          : { type: 'uinteger', value: stub.encodedValues.largeSequenceCount },
      },
    });
    
  });
});
