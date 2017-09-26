// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Rename operators.snapshot.js in operators.spec.js .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// END-HISTORY
// ====================================================================

import { compile } from './operators';

describe('state colors conditions', () => {
  test('equals', () => {
    const condition = {
      field: 'convertedValue',
      operator: '=',
      operand: '1',
    };

    expect(compile(condition)(1)).toBe(true);
    expect(compile(condition)(0.5)).toBe(false);
  });
  test('notEquals', () => {
    const condition = {
      field: 'convertedValue',
      operator: '!=',
      operand: '1',
    };

    expect(compile(condition)(1)).toBe(false);
    expect(compile(condition)(0.5)).toBe(true);
  });
  test('inf', () => {
    const condition = {
      field: 'convertedValue',
      operator: '<',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(false);
    expect(compile(condition)(1)).toBe(false);
    expect(compile(condition)(0.5)).toBe(true);
  });
  test('infOrEq', () => {
    const condition = {
      field: 'convertedValue',
      operator: '<=',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(false);
    expect(compile(condition)(1)).toBe(true);
    expect(compile(condition)(0.5)).toBe(true);
  });
  test('sup', () => {
    const condition = {
      field: 'convertedValue',
      operator: '>',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(true);
    expect(compile(condition)(1)).toBe(false);
    expect(compile(condition)(0.5)).toBe(false);
  });
  test('supOrEq', () => {
    const condition = {
      field: 'convertedValue',
      operator: '>=',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(true);
    expect(compile(condition)(1)).toBe(true);
    expect(compile(condition)(0.5)).toBe(false);
  });
  test('CONTAINS', () => {
    const condition = {
      field: 'convertedValue',
      operator: 'CONTAINS',
      operand: 'abc',
    };

    expect(compile(condition)('abcdefg')).toBe(true);
    expect(compile(condition)('abdfg')).toBe(false);
  });
  test('!CONTAINS', () => {
    const condition = {
      field: 'convertedValue',
      operator: 'ICONTAINS',
      operand: 'abc',
    };

    expect(compile(condition)('abcdefg')).toBe(false);
    expect(compile(condition)('abdfg')).toBe(true);
  });
});
