// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./statisticFunctionDetails');
const { getStatisticFunctionDetails } = require('../stubs');



describe('protobuf/isis/ccsds_mc/StatisticFunctionDetails', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/StatisticFunctionDetails.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.StatisticFunctionDetails');
  const fixture = getStatisticFunctionDetails();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      description: { type: 'string', value: fixture.description },
      timestamp: { type: 'time', value: fixture.timestamp },
    });
    
    
  });
});
