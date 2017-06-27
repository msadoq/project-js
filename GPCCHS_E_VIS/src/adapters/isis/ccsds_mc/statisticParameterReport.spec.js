// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./statisticParameterReport');
const stub = require('./statisticParameterReport.stub')();



describe('protobuf/isis/ccsds_mc/StatisticParameterReport', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticParameterReport.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticParameterReport');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      parameterId: {
        domaineId: { type: 'ushort', value: stub.parameterId.domaineId },
        uid: { type: 'long', symbol: `${stub.parameterId.uid}` },
      },
      parameterType: (typeof stub.parameterType === 'undefined')
        ? null
        : {
          area: { type: 'ushort', value: stub.parameterType.area },
          service: { type: 'ushort', value: stub.parameterType.service },
          version: { type: 'uoctet', value: stub.parameterType.version },
          number: { type: 'ushort', value: stub.parameterType.number },
        },
    });
    expect(decoded.values).toHaveLength(stub.values.length);
    for (let i = 0; i < stub.values.length; i += 1) {
      expect(decoded.values[i]).toMatchObject({
        function: { type: 'long', symbol: `${stub.values[i].function}` },
      });
      expect(decoded.values[i].value).toHaveLength(stub.values[i].value.length);
      for (let ii = 0; ii < stub.values[i].value.length; ii += 1) {
        expect(decoded.values[i].value[ii]).toMatchObject({
          startTime: (typeof stub.values[i].value[ii].startTime === 'undefined')
            ? null
            : { type: 'time', value: stub.values[i].value[ii].startTime },
          endTime: (typeof stub.values[i].value[ii].endTime === 'undefined')
            ? null
            : { type: 'time', value: stub.values[i].value[ii].endTime },
          valueTime: (typeof stub.values[i].value[ii].valueTime === 'undefined')
            ? null
            : { type: 'time', value: stub.values[i].value[ii].valueTime },
          value: (typeof stub.values[i].value[ii].value === 'undefined')
            ? null
            : { type: 'double', symbol: stub.values[i].value[ii].value.toString() },
          sampleCount: { type: 'uinteger', value: stub.values[i].value[ii].sampleCount },
          timestamp: { type: 'time', value: stub.values[i].value[ii].timestamp },
        });
        
      }
    }
  });
});
