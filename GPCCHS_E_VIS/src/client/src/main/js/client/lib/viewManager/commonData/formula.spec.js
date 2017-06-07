/* eslint-disable no-unused-expressions */
const { should } = require('../../common/test');
const formula = require('./formula');

describe('viewManager/commonData/formula', () => {
  it('empty or invalid type', () => {
    expect(formula()).toBeFalsy();
    expect(formula(null)).toBeFalsy();
    expect(formula(10)).toBeFalsy();
  });
  it('invalid format', () => {
    expect(formula('.Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>')).toBeFalsy();
    expect(formula('.ATT_BC_STR1VOLTAGE<ReportingParameter>')).toBeFalsy();
    expect(formula('Reporting.<ReportingParameter>')).toBeFalsy();
    expect(formula('Reporting<ReportingParameter>')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE<>')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>x')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.')).toBeFalsy();
  });
  it('works without field', () => {
    expect(typeof formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>')).toBe('object')
      .with.properties({
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>',
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        field: undefined,
      });
  });
  it('works with field', () => {
    expect(
      typeof formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue')
    ).toBe('object')
      .with.properties({
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        field: 'extractedValue',
      });
  });
});
