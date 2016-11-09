require('../utils/test');
const flattenDataId = require('./flattenDataId');
// eslint-disable-next-line import/no-extraneous-dependencies
const { getDataId } = require('common/stubs/data');

describe('models/getLocalId', () => {
  it('works', () => {
    flattenDataId(getDataId())
      .should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
});
