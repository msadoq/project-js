// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./statisticValueStruct');
const { getStatisticValueStruct } = require('../stubs');



describe('protobuf/isis/ccsds_mc/StatisticValueStruct', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticValueStruct.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticValueStruct');
  const fixture = getStatisticValueStruct();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      startTime: (typeof fixture.startTime === 'undefined')
        ? null
        : { type: 'time', value: fixture.startTime },
      endTime: (typeof fixture.endTime === 'undefined')
        ? null
        : { type: 'time', value: fixture.endTime },
      valueTime: (typeof fixture.valueTime === 'undefined')
        ? null
        : { type: 'time', value: fixture.valueTime },
      value: (typeof fixture.value === 'undefined')
        ? null
        : { type: 'double', symbol: fixture.value.toString() },
      sampleCount: { type: 'uinteger', value: fixture.sampleCount },
      timestamp: { type: 'time', value: fixture.timestamp },
    });
    
    
  });
});
