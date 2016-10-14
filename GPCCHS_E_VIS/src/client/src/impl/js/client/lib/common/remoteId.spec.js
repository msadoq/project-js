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
    remoteId(dataId).should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
    remoteId(dataId, undefined)
      .should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
    remoteId(dataId, [])
      .should.equal('Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200');
  });
//   it('one filter', () => {
//     remoteId(dataId, [{field: 'convertedValue', operator: '!=',  operand: '0'}])
//       .should.equal(
//        'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:convertedValue!=0'
//        );
//   });
//   it('multi filter with predictable order', () => {
//     remoteId(dataId, [
//       {field: 'extractedValue', operator: '>=',  operand: '1'},
//       {field: 'convertedValue', operator: '!=',  operand: '2'},
//       {field: 'extractedValue', operator: '<=',  operand: '3'},
//     ]).should.equal(
//       'Reporting.ATT_BC_STR1STRRFQ1<ReportingParameter>:100:200:convertedValue!=2'
//       + ',extractedValue<=3,extractedValue>=1'
//     );
//   });
});
