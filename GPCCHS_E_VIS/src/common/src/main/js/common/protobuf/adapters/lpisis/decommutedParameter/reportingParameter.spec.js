// Produced by Acceleo JavaScript Generator 1.1.0
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

const validityState = require('../ccsds_mc/validityState');

describe('protobuf/lpisis/decommutedParameter/ReportingParameter', () => {
  const fixture = stubData.getReportingParameter();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.decommutedParameter.ReportingParameter', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.decommutedParameter.ReportingParameter', buffer);
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
