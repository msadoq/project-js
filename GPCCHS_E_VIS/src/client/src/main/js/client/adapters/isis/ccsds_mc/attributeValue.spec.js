// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./attributeValue');
const stub = require('./attributeValue.stub')();



describe('protobuf/isis/ccsds_mc/AttributeValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/AttributeValue.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.AttributeValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      value: { type: 'double', symbol: stub.value.toString() },
    });
    
  });
});
