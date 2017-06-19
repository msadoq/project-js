const flattenDataId = require('./flattenDataId');

describe('models/getLocalId', () => {
  test('works', () => {
    expect(flattenDataId({
      parameterName: 'ATT_BC_STR1STRRFQ1',
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      sessionId: 100,
      domainId: 200,
    })).toEqual('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
});
