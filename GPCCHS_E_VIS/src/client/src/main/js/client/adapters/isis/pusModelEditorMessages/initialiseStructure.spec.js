// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./initialiseStructure');
const stub = require('./initialiseStructure.stub')();



describe('protobuf/isis/pusModelEditorMessages/InitialiseStructure', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/InitialiseStructure.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.InitialiseStructure');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      forReplay: { type: 'boolean', value: stub.forReplay },
      firstTime: { type: 'time', value: stub.firstTime },
      lastTime: { type: 'time', value: stub.lastTime },
      continuous: { type: 'boolean', value: stub.continuous },
    });
    
  });
});
