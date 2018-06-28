// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./statAggregation');
const stub = require('./statAggregation.stub')();



describe('protobuf/isis/statAggregation/StatAggregation', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatAggregation.proto`, { keepCase: true })
    .lookup('statAggregation.protobuf.StatAggregation');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      statDate: { type: 'time', value: stub.statDate },
    });
    expect(decoded.statValue).toHaveLength(stub.statValue.length);
    for (let i = 0; i < stub.statValue.length; i += 1) {
      expect(decoded.statValue[i]).toMatchObject({
        related: { type: 'long', symbol: `${stub.statValue[i].related}` },
        attrValue: { type: 'double', symbol: stub.statValue[i].attrValue.toString() },
      });
      
    }
  });
});
