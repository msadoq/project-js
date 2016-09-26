require('../utils/test');
const localId = require('./localId');

describe('utils/localId', () => {
  it('works', () => {
    localId({
      parameterName: 'ATT_BC_STR1STRRFQ1',
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      sessionId: 100,
      domainId: 200,
    }).should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
});
