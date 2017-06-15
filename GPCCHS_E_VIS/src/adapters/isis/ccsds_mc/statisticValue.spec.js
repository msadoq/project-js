// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');




describe('protobuf/isis/ccsds_mc/StatisticValue', () => {
  const fixture = stubData.getStatisticValue();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.ccsds_mc.StatisticValue', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.ccsds_mc.StatisticValue', buffer);
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

