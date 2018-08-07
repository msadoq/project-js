// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./dataStructure');
const stub = require('./dataStructure.stub')();



describe('protobuf/isis/pusModelEditorMessages/DataStructure', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DataStructure.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.DataStructure');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      dataType: { type: 'uinteger', value: stub.dataType },
      groundDate: { type: 'time', value: stub.groundDate },
      payload: { type: 'blob', value: stub.payload },
    });
    
  });
});
