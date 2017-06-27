// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusElement');
const stub = require('./pusElement.stub')();



describe('protobuf/isis/pusGroundModel/PusElement', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusElement.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.PusElement');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      lastUpdateMode: { type: 'uinteger', value: stub.lastUpdateMode },
      lastUpdateTime: { type: 'time', value: stub.lastUpdateTime },
    });
    
  });
});
