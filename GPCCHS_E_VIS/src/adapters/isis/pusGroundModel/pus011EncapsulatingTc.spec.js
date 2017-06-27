// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011EncapsulatingTc');
const stub = require('./pus011EncapsulatingTc.stub')();



describe('protobuf/isis/pusGroundModel/Pus011EncapsulatingTc', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011EncapsulatingTc.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011EncapsulatingTc');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      sourceId: { type: 'uinteger', value: stub.sourceId },
      commandApid: { type: 'uinteger', value: stub.commandApid },
      sequenceCount: { type: 'uinteger', value: stub.sequenceCount },
    });
    
  });
});
