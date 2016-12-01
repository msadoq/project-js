/* eslint-disable no-unused-expressions */
const { should } = require('./../../common/test');
const formula = require('./formula');

describe('connectedData/formula', () => {
  it('empty or invalid type', () => {
    should.not.exist(formula());
    should.not.exist(formula(null));
    should.not.exist(formula(10));
  });
  it('invalid format', () => {
    should.not.exist(formula('.Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>'));
    should.not.exist(formula('.ATT_BC_STR1VOLTAGE<ReportingParameter>'));
    should.not.exist(formula('Reporting.<ReportingParameter>'));
    should.not.exist(formula('Reporting<ReportingParameter>'));
    should.not.exist(formula('Reporting.ATT_BC_STR1VOLTAGE<>'));
    should.not.exist(formula('Reporting.ATT_BC_STR1VOLTAGE'));
    should.not.exist(formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>x'));
    should.not.exist(formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.'));
  });
  it('works without field', () => {
    formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>')
      .should.be.an('object')
      .with.properties({
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        field: undefined,
      });
  });
  it('works with field', () => {
    formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue')
      .should.be.an('object')
      .with.properties({
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        field: 'extractedValue',
      });
  });
});
