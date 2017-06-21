// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./parameterValue');
const { getParameterValue } = require('../stubs');

const validityState = require('./validityState');

describe('protobuf/isis/ccsds_mc/ParameterValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ParameterValue.proto`, { keepCase: true })
    .lookup('ccsds_mc.protobuf.ParameterValue');
  const fixture = getParameterValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      convertedValue: { type: 'double', symbol: fixture.convertedValue.toString() },
      extractedValue: { type: 'double', symbol: fixture.extractedValue.toString() },
      rawValue: { type: 'double', symbol: fixture.rawValue.toString() },
      isObsolete: { type: 'boolean', value: fixture.isObsolete },
      triggerOnCounter: { type: 'ushort', value: fixture.triggerOnCounter },
      triggerOffCounter: { type: 'ushort', value: fixture.triggerOffCounter },
      monitoringState: { type: 'string', value: fixture.monitoringState },
      validityState: { type: 'enum', value: fixture.validityState, symbol: validityState[fixture.validityState] },
    });
    
    
  });
});
