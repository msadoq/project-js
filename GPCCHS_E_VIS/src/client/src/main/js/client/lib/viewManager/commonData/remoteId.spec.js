import globalConstants from 'common/constants';
import '../../common/test';
import remoteId from './remoteId';

describe('viewManager/commonData/remoteId', () => {
  const dataId = {
    parameterName: 'ATT_BC_STR1STRRFQ1',
    catalog: 'Reporting',
    comObject: 'ReportingParameter',
    sessionId: 100,
    domainId: 200,
  };

  it('no filter', () => {
    remoteId(globalConstants.DATASTRUCTURETYPE_RANGE, dataId)
      .should.equal('range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
    remoteId(globalConstants.DATASTRUCTURETYPE_RANGE, dataId, undefined)
      .should.equal('range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
    remoteId(globalConstants.DATASTRUCTURETYPE_LAST, dataId, [])
      .should.equal('last@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
  it('one filter', () => {
    remoteId(
      globalConstants.DATASTRUCTURETYPE_RANGE,
      dataId,
      [{ field: 'convertedValue', operator: '!=', operand: '0' }]
    ).should.equal(
       'range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:convertedValue.!=.0'
       );
  });
  it('multi filter with predictable order', () => {
    remoteId(globalConstants.DATASTRUCTURETYPE_RANGE, dataId, [
      { field: 'extractedValue', operator: '>=', operand: '1' },
      { field: 'convertedValue', operator: '!=', operand: '2' },
      { field: 'extractedValue', operator: '<=', operand: '3' },
    ]).should.equal(
      'range@Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:convertedValue.!=.2'
      + ',extractedValue.<=.3,extractedValue.>=.1'
    );
  });
});
