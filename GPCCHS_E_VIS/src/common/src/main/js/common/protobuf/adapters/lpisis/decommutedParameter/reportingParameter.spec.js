// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

const validityState = require('./validityState');

describe('protobuf/lpisis/decommutedParameter/reportingParameter', () => {
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
      convertedValue: { type: 'double', value: fixture.convertedValue },
      rawValue: { type: 'double', value: fixture.rawValue },
      extractedValue: { type: 'double', value: fixture.extractedValue },
      monitoringState: { type: 'string', value: fixture.monitoringState },
      triggerOffCounter: { type: 'ushort', value: fixture.triggerOffCounter },
      triggerOnCounter: { type: 'ushort', value: fixture.triggerOnCounter },
      validityState: { type: 'enum', value: fixture.validityState, symbol: validityState[fixture.validityState] },
      isObsolete: { type: 'boolean', value: fixture.isObsolete },
      isNominal: { type: 'boolean', value: fixture.isNominal },
      referenceTimestamp: { type: 'time', value: fixture.onboardDate },
    });
  });
});