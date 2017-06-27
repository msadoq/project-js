// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./statisticValueStruct');
const stub = require('./statisticValueStruct.stub')();



describe('protobuf/isis/ccsds_mc/StatisticValueStruct', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticValueStruct.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticValueStruct');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      startTime: (typeof stub.startTime === 'undefined')
        ? null
        : { type: 'time', value: stub.startTime },
      endTime: (typeof stub.endTime === 'undefined')
        ? null
        : { type: 'time', value: stub.endTime },
      valueTime: (typeof stub.valueTime === 'undefined')
        ? null
        : { type: 'time', value: stub.valueTime },
      value: (typeof stub.value === 'undefined')
        ? null
        : { type: 'double', symbol: stub.value.toString() },
      sampleCount: { type: 'uinteger', value: stub.sampleCount },
      timestamp: { type: 'time', value: stub.timestamp },
    });
    
  });
});
