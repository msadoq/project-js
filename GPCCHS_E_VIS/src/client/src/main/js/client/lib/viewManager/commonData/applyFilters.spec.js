import _omit from 'lodash/omit';
import _assign from 'lodash/assign';

import '../../common/test';

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
      applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 43 } }, filter).should.equal(false);
      filter[0].operand = 'myString';
      applyFilters({ dataValue: { type: 'string', value: 'myString' } }, filter)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'string', value: 'myOtherString' } }, filter)
        .should.equal(false);
      filter[0].operand = 'ok';
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'nok' } }, filter)
        .should.equal(false);
    });
    it('!=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '!=',
          operand: '42',
        },
      ];
      applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 43 } }, filter).should.equal(true);
      filter[0].operand = 'myString';
      applyFilters({ dataValue: { type: 'string', value: 'myString' } }, filter)
        .should.equal(false);
      applyFilters({ dataValue: { type: 'string', value: 'myOtherString' } }, filter)
        .should.equal(true);
      filter[0].operand = 'nok';
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'nok' } }, filter)
        .should.equal(false);
    });
    it('<', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '<',
          operand: '42',
        },
      ];
      applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'string', value: '50' } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'boolean', value: true } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
        .should.equal(true);
    });
    it('>', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>',
          operand: '42',
        },
      ];
      applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'string', value: '50' } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'boolean', value: true } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
        .should.equal(true);
    });
    it('<=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '<=',
          operand: '42',
        },
      ];
      applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'string', value: '50' } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'boolean', value: true } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
        .should.equal(true);
    });
    it('>=', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '>=',
          operand: '42',
        },
      ];
      applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'string', value: '50' } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'boolean', value: true } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'ok' } }, filter)
        .should.equal(true);
    });
    it('contains', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: 'CONTAINS',
          operand: 'foo',
        },
      ];
      applyFilters({ dataValue: { type: 'string', value: 'foo' } }, filter)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'string', value: 'bar foo bar' } }, filter)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'string', value: 'bar' } }, filter)
        .should.equal(false);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
        .should.equal(true);
      const regex = [
        {
          field: 'dataValue',
          operator: 'CONTAINS',
          operand: '/^FO*/i',
        },
      ];
      applyFilters({ dataValue: { type: 'string', value: 'foo bar' } }, regex)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
        .should.equal(true);
    });
    it('icontains', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: 'ICONTAINS',
          operand: 'foo',
        },
      ];
      applyFilters({ dataValue: { type: 'string', value: 'foo' } }, filter)
        .should.equal(false);
      applyFilters({ dataValue: { type: 'string', value: 'bar foo bar' } }, filter)
        .should.equal(false);
      applyFilters({ dataValue: { type: 'string', value: 'bar' } }, filter)
        .should.equal(true);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
        .should.equal(true);
      const regex = [
        {
          field: 'dataValue',
          operator: 'ICONTAINS',
          operand: '/^FO*/i',
        },
      ];
      applyFilters({ dataValue: { type: 'string', value: 'foo bar' } }, regex)
        .should.equal(false);
      applyFilters({ dataValue: { type: 'enum', value: 1, symbol: 'foo bar' } }, regex)
        .should.equal(false);
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
      applyFilters({ dataValue: { type: 'integer', value: 30 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ dataValue: { type: 'integer', value: 41 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 49 } }, filter).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
    });
    it('invalid data', () => {
      const filter = [
        {
          field: 'dataValue',
          operator: '=',
          operand: '42',
        },
      ];
      applyFilters({ otherField: { type: 'integer', value: '42' } }, filter).should.equal(true);
      applyFilters({ otherField: { type: 'integer', value: '43' } }, filter).should.equal(true);
    });
    it('invalid filter', () => {
      const filter = {
        field: 'dataValue',
        operator: '=',
        operand: '42',
      };
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['field'])])
        .should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 50 } },
        [_assign({}, filter, { field: '' })]).should.equal(true);
      applyFilters({ dataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['operator'])])
        .should.equal(true);
    });
    it('Long value', () => {
      const data = { longValue: { type: 'long', symbol: '18446744073709551600' } };
      const filter = { field: 'longValue', operator: '=', operand: '18446744073709551600' };
      applyFilters(data, [filter]).should.equal(true);
      filter.operator = '<';
      applyFilters(data, [filter]).should.equal(false);
      filter.operator = '<=';
      applyFilters(data, [filter]).should.equal(true);
      filter.operator = '>';
      applyFilters(data, [filter]).should.equal(false);
      filter.operator = '>=';
      applyFilters(data, [filter]).should.equal(true);
      data.longValue.symbol = '18446744073709551510';
      filter.operator = '=';
      applyFilters(data, [filter]).should.equal(false);
      filter.operator = '<';
      applyFilters(data, [filter]).should.equal(true);
      filter.operand = '18446744073709551505';
      filter.operator = '>';
      applyFilters(data, [filter]).should.equal(true);
    });
    it('double value', () => {
      const data = { longValue: { type: 'double', symbol: '184467440737095500.1600' } };
      const filter = { field: 'longValue', operator: '=', operand: '184467440737095500.1600' };
      applyFilters(data, [filter]).should.equal(true);
      filter.operator = '<';
      applyFilters(data, [filter]).should.equal(false);
      filter.operator = '<=';
      applyFilters(data, [filter]).should.equal(true);
      filter.operator = '>';
      applyFilters(data, [filter]).should.equal(false);
      filter.operator = '>=';
      applyFilters(data, [filter]).should.equal(true);
      data.longValue.symbol = '184467440737095500.1510';
      filter.operator = '=';
      applyFilters(data, [filter]).should.equal(false);
      filter.operator = '<';
      applyFilters(data, [filter]).should.equal(true);
      filter.operand = '184467440737095500.1505';
      filter.operator = '>';
      applyFilters(data, [filter]).should.equal(true);
      filter.operator = '<';
      applyFilters(data, [filter]).should.equal(false);
    });
  });
});
