const { should } = require('./test');
const parseDataFullName = require('./parseDataFullName');

/* eslint-disable no-unused-expressions */

describe('parseDataFullName', () => {
  it('empty or invalid type', () => {
    should.not.exist(parseDataFullName());
    should.not.exist(parseDataFullName(null));
    should.not.exist(parseDataFullName(10));
  });
  it('invalid format', () => {
    should.not.exist(parseDataFullName('.Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>'));
    should.not.exist(parseDataFullName('.ATT_BC_STR1VOLTAGE<ReportingParameter>'));
    should.not.exist(parseDataFullName('Reporting.<ReportingParameter>'));
    should.not.exist(parseDataFullName('Reporting<ReportingParameter>'));
    should.not.exist(parseDataFullName('Reporting.ATT_BC_STR1VOLTAGE<>'));
    should.not.exist(parseDataFullName('Reporting.ATT_BC_STR1VOLTAGE'));
    should.not.exist(parseDataFullName('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>x'));
  });
  it('works', () => {
    parseDataFullName('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>')
      .should.be.an('object')
      .with.properties({
        dataFullName: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
        catalog: 'Reporting',
        parameter: 'ATT_BC_STR1VOLTAGE',
        type: 'ReportingParameter',
      });
  });
});
