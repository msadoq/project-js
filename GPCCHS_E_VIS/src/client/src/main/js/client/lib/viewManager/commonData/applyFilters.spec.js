import _omit from 'lodash/omit';
import _assign from 'lodash/assign';

import { applyFilters } from './applyFilters';

describe('utils/filters', () => {
  describe('applyFilters', () => {
    it('=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 43 } }, filter)).toBe(false);
      filter[0].operand = 'myString';
      expect(applyFilters({ dataValue: { type: 'string', value: 'myString' } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'myOtherString' } }, filter)
      ).toBe(false);
      filter[0].operand = 'ok';
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'nok' } }, filter)
      ).toBe(false);
    });
    it('!=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '!=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 43 } }, filter)).toBe(true);
      filter[0].operand = 'myString';
      expect(applyFilters({ dataValue: { type: 'string', value: 'myString' } }, filter)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'myOtherString' } }, filter)
      ).toBe(true);
      filter[0].operand = 'nok';
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'nok' } }, filter)
      ).toBe(false);
    });
    it('<', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '<',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    it('>', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    it('<=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '<=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    it('>=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>=',
          operand: '42',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'string', value: '50' } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'boolean', value: true } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
      ).toBe(true);
    });
    it('contains', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: 'CONTAINS',
          operand: 'foo',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo' } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'bar foo bar' } }, filter)
      ).toBe(true);
      expect(applyFilters({ dataValue: { type: 'string', value: 'bar' } }, filter)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(true);
      const regex = [
        {
          field: 'dataValue',
          operator: 'CONTAINS',
          operand: '/^FO*/i',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo bar' } }, regex)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(true);
    });
    it('icontains', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: 'ICONTAINS',
          operand: 'foo',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo' } }, filter)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'string', value: 'bar foo bar' } }, filter)
      ).toBe(false);
      expect(applyFilters({ dataValue: { type: 'string', value: 'bar' } }, filter)).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(true);
      const regex = [
        {
          field: 'dataValue',
          operator: 'ICONTAINS',
          operand: '/^FO*/i',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'string', value: 'foo bar' } }, regex)).toBe(false);
      expect(
        applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
      ).toBe(false);
    });
    it('multi', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>',
          operand: '40',
        },
        {
          field: 'dataValue',
          operator: '<=',
          operand: '49',
        },
      ];
      expect(applyFilters({ dataValue: { type: 'integer', value: 30 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter)).toBe(false);
      expect(applyFilters({ dataValue: { type: 'integer', value: 41 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 49 } }, filter)).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter)).toBe(false);
    });
    it('invalid data', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '=',
          operand: '42',
        },
      ];
      expect(applyFilters({ otherField: { type: 'integer', value: '42' } }, filter)).toBe(true);
      expect(applyFilters({ otherField: { type: 'integer', value: '43' } }, filter)).toBe(true);
    });
    it('invalid filter', () => {
      const filter = {
        field: 'dataValue',
        operator: '=',
        operand: '42',
      };
      expect(
        applyFilters({ dataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['field'])])
      ).toBe(true);
      expect(applyFilters({ dataValue: { type: 'integer', value: 50 } },
        [_assign({}, filter, { field: '' })])).toBe(true);
      expect(
        applyFilters({ dataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['operator'])])
      ).toBe(true);
    });
    it('Long value', () => {
      const data = { longValue: { type: 'long', symbol: '18446744073709551600' } };
      const filter = { field: 'longValue', operator: '=', operand: '18446744073709551600' };
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<=';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '>=';
      expect(applyFilters(data, [filter])).toBe(true);
      data.longValue.symbol = '18446744073709551510';
      filter.operator = '=';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operand = '18446744073709551505';
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(true);
    });
    it('double value', () => {
      const data = { longValue: { type: 'double', symbol: '184467440737095500.1600' } };
      const filter = { field: 'longValue', operator: '=', operand: '184467440737095500.1600' };
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<=';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '>=';
      expect(applyFilters(data, [filter])).toBe(true);
      data.longValue.symbol = '184467440737095500.1510';
      filter.operator = '=';
      expect(applyFilters(data, [filter])).toBe(false);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operand = '184467440737095500.1505';
      filter.operator = '>';
      expect(applyFilters(data, [filter])).toBe(true);
      filter.operator = '<';
      expect(applyFilters(data, [filter])).toBe(false);
    });
  });
});
