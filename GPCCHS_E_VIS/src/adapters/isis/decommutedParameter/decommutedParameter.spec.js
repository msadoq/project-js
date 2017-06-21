// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./decommutedParameter');
const { getDecommutedParameter } = require('../stubs');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/decommutedParameter/DecommutedParameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DecommutedParameter.proto`, { keepCase: true })
    .lookup('decommutedParameter.protobuf.DecommutedParameter');
  const fixture = getDecommutedParameter();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      onboardDate: { type: 'time', value: fixture.onboardDate },
      groundDate: { type: 'time', value: fixture.groundDate },
      convertedValue: { type: 'double', symbol: fixture.convertedValue.toString() },
      rawValue: { type: 'double', symbol: fixture.rawValue.toString() },
      extractedValue: { type: 'double', symbol: fixture.extractedValue.toString() },
      monitoringState: { type: 'string', value: fixture.monitoringState },
      triggerOnCounter: { type: 'ushort', value: fixture.triggerOnCounter },
      triggerOffCounter: { type: 'ushort', value: fixture.triggerOffCounter },
      validityState: { type: 'enum', value: fixture.validityState, symbol: validityState[fixture.validityState] },
      isObsolete: { type: 'boolean', value: fixture.isObsolete },
      isNominal: { type: 'boolean', value: fixture.isNominal },
    });
    
    
  });
});
