// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./statValue');
const stub = require('./statValue.stub')();



describe('protobuf/isis/statAggregation/StatValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatValue.proto`, { keepCase: true })
    .lookup('statAggregation.protobuf.StatValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      related: { type: 'long', symbol: `${stub.related}` },
      attrValue: { type: 'double', symbol: stub.attrValue.toString() },
    });
    
  });
});
