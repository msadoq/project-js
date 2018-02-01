// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Fix broken tests . .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline definition
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in viewManager
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

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
