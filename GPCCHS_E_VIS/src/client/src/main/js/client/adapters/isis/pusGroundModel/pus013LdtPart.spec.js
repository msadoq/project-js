// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus013LdtPart');
const stub = require('./pus013LdtPart.stub')();



describe('protobuf/isis/pusGroundModel/Pus013LdtPart', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus013LdtPart.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus013LdtPart');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      status: { type: 'uinteger', value: stub.status },
      partSize: { type: 'uinteger', value: stub.partSize },
      partId: { type: 'uinteger', value: stub.partId },
      sourceId: { type: 'uinteger', value: stub.sourceId },
      commandApid: { type: 'uinteger', value: stub.commandApid },
      sequenceCount: { type: 'uinteger', value: stub.sequenceCount },
      serviceDataUnit: { type: 'blob', value: stub.serviceDataUnit },
    });
    
  });
});
