// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011CommandParameter');
const stub = require('./pus011CommandParameter.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus011CommandParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011CommandParameter.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus011CommandParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      parameterName: { type: 'string', value: stub.parameterName },
      parameterValue: { type: 'string', value: stub.parameterValue },
      parameterDescription: { type: 'string', value: stub.parameterDescription },
      lastUpdateMode: { type: 'uinteger', value: stub.lastUpdateMode },
      lastUpdateTime: { type: 'string', value: stub.lastUpdateTime },
    });
    
  });
});
