// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./encodingAction');
const stub = require('./encodingAction.stub')();



describe('protobuf/isis/encode/EncodingAction', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncodingAction.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncodingAction');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      sourceId: (typeof stub.sourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.sourceId },
      isForSending: (typeof stub.isForSending === 'undefined')
        ? null
        : { type: 'boolean', value: stub.isForSending },
      countOverwriteFlag: (typeof stub.countOverwriteFlag === 'undefined')
        ? null
        : { type: 'boolean', value: stub.countOverwriteFlag },
      preencryptedFlag: (typeof stub.preencryptedFlag === 'undefined')
        ? null
        : { type: 'boolean', value: stub.preencryptedFlag },
      ackField: (typeof stub.ackField === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.ackField },
    });
    expect(decoded.argumentValues).toHaveLength(stub.argumentValues.length);
    for (let i = 0; i < stub.argumentValues.length; i += 1) {
      expect(decoded.argumentValues[i]).toMatchObject({
        value: { type: 'double', symbol: stub.argumentValues[i].value.toString() },
      });
      
    }
    expect(decoded.argumentDefinitions).toHaveLength(stub.argumentDefinitions.length);
    for (let i = 0; i < stub.argumentDefinitions.length; i += 1) {
      expect(decoded.argumentDefinitions[i]).toMatchObject({
        type: 'identifier',
        value: stub.argumentDefinitions[i],
      });
    }
    expect(decoded.isConvertedValues).toHaveLength(stub.isConvertedValues.length);
    for (let i = 0; i < stub.isConvertedValues.length; i += 1) {
      expect(decoded.isConvertedValues[i]).toMatchObject({
        type: 'boolean',
        value: stub.isConvertedValues[i],
      });
    }
  });
});
