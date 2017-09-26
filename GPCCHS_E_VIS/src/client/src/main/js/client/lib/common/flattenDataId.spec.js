// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move few common/ modules in client/ folder
// VERSION : 1.1.2 : FA : #7164 : 07/07/2017 : Apply filters on getLast request
// END-HISTORY
// ====================================================================

const flattenDataId = require('./flattenDataId');

describe('models/getLocalId', () => {
  test('works without filter', () => {
    expect(flattenDataId({
      parameterName: 'ATT_BC_STR1STRRFQ1',
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      sessionId: 100,
      domainId: 200,
    })).toEqual('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
  test('works with one filter', () => {
    expect(flattenDataId({
      parameterName: 'ATT_BC_STR1STRRFQ1',
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      sessionId: 100,
      domainId: 200,
    }, [{ operand: '2', operator: '=', field: 'extracted' }]))
    .toEqual('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:extracted.=.2');
  });
  test('works with two filters', () => {
    expect(flattenDataId({
      parameterName: 'ATT_BC_STR1STRRFQ1',
      catalog: 'Reporting',
      comObject: 'ReportingParameter',
      sessionId: 100,
      domainId: 200,
    }, [
      { operand: '2', operator: '=', field: 'extracted' },
      { operand: '3', operator: '!=', field: 'raw' }]))
    .toEqual('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:extracted.=.2,raw.!=.3');
  });
});
