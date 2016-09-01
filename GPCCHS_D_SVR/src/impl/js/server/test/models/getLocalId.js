require('../../lib/utils/test');
const getLocalId = require('../../lib/models/getLocalId');
const { getDataId } = require('../../lib/stubs/data');

describe('models/getLocalId', () => {
  it('works', () => {
    getLocalId(getDataId())
      .should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
});
