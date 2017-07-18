// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./encodeInvocation');
const stub = require('./encodeInvocation.stub')();

const encodedType = require('./encodedType');
const inputType = require('./inputType');

describe('protobuf/isis/encode/EncodeInvocation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodeInvocation.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodeInvocation');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      definitionId: { type: 'long', symbol: `${stub.definitionId}` },
      inputType: { type: 'enum', value: stub.inputType, symbol: inputType[stub.inputType] },
      encodingAction: {
        sourceId: (typeof stub.encodingAction.sourceId === 'undefined')
          ? null
          : { type: 'uinteger', value: stub.encodingAction.sourceId },
        isForSending: (typeof stub.encodingAction.isForSending === 'undefined')
          ? null
          : { type: 'boolean', value: stub.encodingAction.isForSending },
        countOverwriteFlag: (typeof stub.encodingAction.countOverwriteFlag === 'undefined')
          ? null
          : { type: 'boolean', value: stub.encodingAction.countOverwriteFlag },
        preencryptedFlag: (typeof stub.encodingAction.preencryptedFlag === 'undefined')
          ? null
          : { type: 'boolean', value: stub.encodingAction.preencryptedFlag },
        ackField: (typeof stub.encodingAction.ackField === 'undefined')
          ? null
          : { type: 'uinteger', value: stub.encodingAction.ackField },
      },
      encodedType: { type: 'enum', value: stub.encodedType, symbol: encodedType[stub.encodedType] },
    });
    
  });
});
