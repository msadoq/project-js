// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./headerStructure');
const stub = require('./headerStructure.stub')();



describe('protobuf/isis/pusModelEditor/HeaderStructure', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/HeaderStructure.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.HeaderStructure');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      messageType: { type: 'uinteger', value: stub.messageType },
      sessionId: { type: 'uinteger', value: stub.sessionId },
      domainId: { type: 'uinteger', value: stub.domainId },
      pusService: { type: 'uinteger', value: stub.pusService },
      messageUniqueId: { type: 'uinteger', value: stub.messageUniqueId },
    });
    expect(decoded.pusServiceApid).toHaveLength(stub.pusServiceApid.length);
    for (let i = 0; i < stub.pusServiceApid.length; i += 1) {
      expect(decoded.pusServiceApid[i]).toMatchObject({
        value: { type: 'string', value: stub.pusServiceApid[i].value },
      });
      
    }
  });
});
