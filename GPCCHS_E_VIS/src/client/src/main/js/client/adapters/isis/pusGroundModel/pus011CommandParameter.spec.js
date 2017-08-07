// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011CommandParameter');
const stub = require('./pus011CommandParameter.stub')();



describe('protobuf/isis/pusGroundModel/Pus011CommandParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011CommandParameter.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011CommandParameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      parameterName: { type: 'string', value: stub.parameterName },
      parameterValue: { type: 'double', symbol: stub.parameterValue.toString() },
    });
    
  });
});
