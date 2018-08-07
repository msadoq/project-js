// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./unsubscribeStructure');
const stub = require('./unsubscribeStructure.stub')();



describe('protobuf/isis/pusModelEditor/UnsubscribeStructure', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/UnsubscribeStructure.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.UnsubscribeStructure');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      
    });
    
  });
});
