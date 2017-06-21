// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./decommutedValue');
const { getDecommutedValue } = require('../stubs');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/decommutedPacket/DecommutedValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DecommutedValue.proto`, { keepCase: true })
    .lookup('decommutedPacket.protobuf.DecommutedValue');
  const fixture = getDecommutedValue();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'identifier', value: fixture.name },
      extractedValue: { type: 'double', symbol: fixture.extractedValue.toString() },
      rawValue: { type: 'double', symbol: fixture.rawValue.toString() },
      convertedValue: { type: 'double', symbol: fixture.convertedValue.toString() },
      validityState: { type: 'enum', value: fixture.validityState, symbol: validityState[fixture.validityState] },
    });
    
    
  });
});
