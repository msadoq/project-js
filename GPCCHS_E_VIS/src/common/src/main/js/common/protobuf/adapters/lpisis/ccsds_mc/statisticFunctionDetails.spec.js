// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');


describe('protobuf/lpisis/ccsds_mc/StatisticFunctionDetails', () => {
  const fixture = stubData.getStatisticFunctionDetails();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.ccsds_mc.StatisticFunctionDetails', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.ccsds_mc.StatisticFunctionDetails', buffer);
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      description: { type: 'string', value: fixture.description },
      timestamp: { type: 'time', value: fixture.timestamp },
    });
  });
});

