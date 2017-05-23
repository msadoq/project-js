require('./test');
const flattenDataId = require('./flattenDataId');
const { getDataId } = require('../protobuf/stubs');

describe('models/getLocalId', () => {
  it('works', () => {
    flattenDataId(getDataId())
      .should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
});
