require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/lpisis/decommutedPacket/decommutedPacket', () => {
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
    json.should.have.a.property('decommutedValues').that.is.an('array');
    for (let i = 0; i < json.decommutedValues.length; i += 1) {
      json.decommutedValues[i].should.be.an('object').that.have.properties({
        name: { type: 'identifier', value: fixture.decommutedValues[i].name },
        extractedValue: { type: 'double', value: fixture.decommutedValues[i].extractedValue },
        rawValue: { type: 'double', value: fixture.decommutedValues[i].rawValue },
        convertedValue: { type: 'double', value: fixture.decommutedValues[i].convertedValue },
        validityState: { type: 'enum', value: fixture.decommutedValues[i].validityState, symbol: validityState[fixture.decommutedValues[i].validityState] },
      });
    }
  });
});
