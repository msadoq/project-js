require('./test');
const remoteId = require('./remoteId');

describe('utils/remoteId', () => {
  const dataId = {
    parameterName: 'ATT_BC_STR1STRRFQ1',
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    sessionId: 100,
    domainId: 200,
  };

  it('no filter', () => {
    remoteId('range', dataId).should.equal('range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
    remoteId('range', dataId, undefined)
      .should.equal('range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
    remoteId('last', dataId, [])
      .should.equal('last@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
  it('one filter', () => {
    remoteId('range', dataId, [{ field: 'convertedValue', operator: '!=', operand: '0' }])
      .should.equal(
       'range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:convertedValue.!=.0'
       );
  });
  it('multi filter with predictable order', () => {
    remoteId('range', dataId, [
      { field: 'extractedValue', operator: '>=', operand: '1' },
      { field: 'convertedValue', operator: '!=', operand: '2' },
      { field: 'extractedValue', operator: '<=', operand: '3' },
    ]).should.equal(
      'range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:convertedValue.!=.2'
      + ',extractedValue.<=.3,extractedValue.>=.1'
    );
  });
});
