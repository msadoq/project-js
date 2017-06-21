// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./statisticFunctionValue');
const { getStatisticFunctionValue } = require('../stubs');



describe('protobuf/isis/ccsds_mc/StatisticFunctionValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticFunctionValue.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticFunctionValue');
  const fixture = getStatisticFunctionValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      function: { type: 'long', symbol: `${fixture.function}` },
    });
    
    json.value.should.be.an('array').that.have.lengthOf(fixture.value.length);
    for (let i = 0; i < fixture.value.length; i += 1) {
      json.value[i].should.be.an('object').that.have.properties({
        startTime: (typeof fixture.value[i].startTime === 'undefined')
          ? null
          : { type: 'time', value: fixture.value[i].startTime },
        endTime: (typeof fixture.value[i].endTime === 'undefined')
          ? null
          : { type: 'time', value: fixture.value[i].endTime },
        valueTime: (typeof fixture.value[i].valueTime === 'undefined')
          ? null
          : { type: 'time', value: fixture.value[i].valueTime },
        value: (typeof fixture.value[i].value === 'undefined')
          ? null
          : { type: 'double', symbol: fixture.value[i].value.toString() },
        sampleCount: { type: 'uinteger', value: fixture.value[i].sampleCount },
        timestamp: { type: 'time', value: fixture.value[i].timestamp },
      });
      
    }
  });
});
