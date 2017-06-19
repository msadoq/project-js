const formula = require('./formula');

describe('viewManager/commonData/formula', () => {
  test('empty or invalid type', () => {
    expect(formula()).toBeFalsy();
    expect(formula(null)).toBeFalsy();
    expect(formula(10)).toBeFalsy();
  });
  test('invalid format', () => {
    expect(formula('.Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>')).toBeFalsy();
    expect(formula('.ATT_BC_STR1VOLTAGE<ReportingParameter>')).toBeFalsy();
    expect(formula('Reporting.<ReportingParameter>')).toBeFalsy();
    expect(formula('Reporting<ReportingParameter>')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE<>')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>x')).toBeFalsy();
    expect(formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.')).toBeFalsy();
  });
  test('works without field', () => {
    const parsedFormula = formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    expect(parsedFormula).toBeAnObject();
    expect(parsedFormula).toHaveProperty('formula', 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>');
    expect(parsedFormula).toHaveProperty('catalog', 'Reporting');
    expect(parsedFormula).toHaveProperty('parameterName', 'ATT_BC_STR1VOLTAGE');
    expect(parsedFormula).toHaveProperty('comObject', 'ReportingParameter');
    expect(parsedFormula).toHaveProperty('field', undefined);
  });
  test('works with field', () => {
    const parsedFormula = formula('Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue');
    expect(parsedFormula).toBeAnObject();
    expect(parsedFormula).toHaveProperty('formula', 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue');
    expect(parsedFormula).toHaveProperty('catalog', 'Reporting');
    expect(parsedFormula).toHaveProperty('parameterName', 'ATT_BC_STR1VOLTAGE');
    expect(parsedFormula).toHaveProperty('comObject', 'ReportingParameter');
    expect(parsedFormula).toHaveProperty('field', 'extractedValue');
  });
});
