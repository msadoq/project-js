// Generated file
require('../../../../utils/test');
const stubData = require('../../../../stubs/data');

const protobuf = require('../../../index');

describe('protobuf/lpisis/decommutedParameter/reportingParameter', () => {
  const fixture = stubData.getReportingParameter();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('lpisis.decommutedParameter.ReportingParameter', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('lpisis.decommutedParameter.ReportingParameter', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});
