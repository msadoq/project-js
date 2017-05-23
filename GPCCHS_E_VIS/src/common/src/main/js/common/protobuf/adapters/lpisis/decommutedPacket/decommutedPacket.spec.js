// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../.././index');

const protobuf = require('../../../index');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/lpisis/decommutedPacket/DecommutedPacket', () => {
  const fixture = stubData.getDecommutedPacket();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.decommutedPacket.DecommutedPacket', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.decommutedPacket.DecommutedPacket', buffer);
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

