// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./decommutedPacket');
const { getDecommutedPacket } = require('../stubs');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/isis/decommutedPacket/DecommutedPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/DecommutedPacket.proto`, { keepCase: true })
    .lookup('decommutedPacket.protobuf.DecommutedPacket');
  const fixture = getDecommutedPacket();
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
      isNominal: { type: 'boolean', value: fixture.isNominal },
    });
    
    json.decommutedValues.should.be.an('array').that.have.lengthOf(fixture.decommutedValues.length);
    for (let i = 0; i < fixture.decommutedValues.length; i += 1) {
      json.decommutedValues[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.decommutedValues[i].name },
        extractedValue: { type: 'double', symbol: fixture.decommutedValues[i].extractedValue.toString() },
        rawValue: { type: 'double', symbol: fixture.decommutedValues[i].rawValue.toString() },
        convertedValue: { type: 'double', symbol: fixture.decommutedValues[i].convertedValue.toString() },
        validityState: { type: 'enum', value: fixture.decommutedValues[i].validityState, symbol: validityState[fixture.decommutedValues[i].validityState] },
      });
      
    }
  });
});
