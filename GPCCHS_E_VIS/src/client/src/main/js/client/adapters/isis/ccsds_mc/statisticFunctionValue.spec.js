// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./statisticFunctionValue');
const stub = require('./statisticFunctionValue.stub')();



describe('protobuf/isis/ccsds_mc/StatisticFunctionValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticFunctionValue.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticFunctionValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      function: { type: 'long', symbol: `${stub.function}` },
    });
    expect(decoded.value).toHaveLength(stub.value.length);
    for (let i = 0; i < stub.value.length; i += 1) {
      expect(decoded.value[i]).toMatchObject({
        startTime: (typeof stub.value[i].startTime === 'undefined')
          ? null
          : { type: 'time', value: stub.value[i].startTime },
        endTime: (typeof stub.value[i].endTime === 'undefined')
          ? null
          : { type: 'time', value: stub.value[i].endTime },
        valueTime: (typeof stub.value[i].valueTime === 'undefined')
          ? null
          : { type: 'time', value: stub.value[i].valueTime },
        value: (typeof stub.value[i].value === 'undefined')
          ? null
          : { type: 'double', symbol: stub.value[i].value.toString() },
        sampleCount: { type: 'uinteger', value: stub.value[i].sampleCount },
        timestamp: { type: 'time', value: stub.value[i].timestamp },
      });
      
    }
  });
});
