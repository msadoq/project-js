// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./encodeArgumentRequest');
const stub = require('./encodeArgumentRequest.stub')();



describe('protobuf/isis/encode/EncodeArgumentRequest', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeArgumentRequest.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeArgumentRequest');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      definitionId: { type: 'long', symbol: `${stub.definitionId}` },
      engValue: { type: 'double', symbol: stub.engValue.toString() },
      bitLength: (typeof stub.bitLength === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.bitLength },
      newEncodingFormat: (typeof stub.newEncodingFormat === 'undefined')
        ? null
        : { type: 'string', value: stub.newEncodingFormat },
      newRawValueType: (typeof stub.newRawValueType === 'undefined')
        ? null
        : { type: 'string', value: stub.newRawValueType },
    });
    
  });
});
