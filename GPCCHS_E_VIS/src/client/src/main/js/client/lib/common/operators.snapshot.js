import { compile } from './operators';

describe('state colors conditions', () => {
  it('equals', () => {
    const condition = {
      field: 'convertedValue',
      operator: '=',
      operand: '1',
    };

    expect(compile(condition)(1)).toBe(true);
    expect(compile(condition)(0.5)).toBe(false);
  });
  it('notEquals', () => {
    const condition = {
      field: 'convertedValue',
      operator: '!=',
      operand: '1',
    };

    expect(compile(condition)(1)).toBe(false);
    expect(compile(condition)(0.5)).toBe(true);
  });
  it('inf', () => {
    const condition = {
      field: 'convertedValue',
      operator: '<',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(false);
    expect(compile(condition)(1)).toBe(false);
    expect(compile(condition)(0.5)).toBe(true);
  });
  it('infOrEq', () => {
    const condition = {
      field: 'convertedValue',
      operator: '<=',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(false);
    expect(compile(condition)(1)).toBe(true);
    expect(compile(condition)(0.5)).toBe(true);
  });
  it('sup', () => {
    const condition = {
      field: 'convertedValue',
      operator: '>',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(true);
    expect(compile(condition)(1)).toBe(false);
    expect(compile(condition)(0.5)).toBe(false);
  });
  it('supOrEq', () => {
    const condition = {
      field: 'convertedValue',
      operator: '>=',
      operand: '1',
    };

    expect(compile(condition)(2)).toBe(true);
    expect(compile(condition)(1)).toBe(true);
    expect(compile(condition)(0.5)).toBe(false);
  });
  it('CONTAINS', () => {
    const condition = {
      field: 'convertedValue',
      operator: 'contains',
      operand: 'abc',
    };

    expect(compile(condition)('abcdefg')).toBe(true);
    expect(compile(condition)('abdfg')).toBe(false);
  });
  it('!CONTAINS', () => {
    const condition = {
      field: 'convertedValue',
      operator: 'icontains',
      operand: 'abc',
    };

    expect(compile(condition)('abcdefg')).toBe(false);
    expect(compile(condition)('abdfg')).toBe(true);
  });
});
