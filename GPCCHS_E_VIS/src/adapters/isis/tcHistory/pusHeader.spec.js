// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusHeader');
const stub = require('./pusHeader.stub')();



describe('protobuf/isis/tcHistory/PusHeader', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusHeader.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.PusHeader');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      versionNumber: { type: 'uoctet', value: stub.versionNumber },
      sequenceCount: (typeof stub.sequenceCount === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.sequenceCount },
      sourceId: (typeof stub.sourceId === 'undefined')
        ? null
        : { type: 'uinteger', value: stub.sourceId },
      serviceType: { type: 'uoctet', value: stub.serviceType },
      serviceSubType: { type: 'uoctet', value: stub.serviceSubType },
      subCounter: { type: 'uoctet', value: stub.subCounter },
      destinationId: { type: 'uoctet', value: stub.destinationId },
      time: { type: 'finetime', value: stub.time },
    });
    
  });
});
