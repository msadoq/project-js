// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');




describe('protobuf/isis/ccsds_mc/StatisticFunctionDetails', () => {
  const fixture = stubData.getStatisticFunctionDetails();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.ccsds_mc.StatisticFunctionDetails', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.ccsds_mc.StatisticFunctionDetails', buffer);
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      description: { type: 'string', value: fixture.description },
      timestamp: { type: 'time', value: fixture.timestamp },
    });
    
    
  });
});

