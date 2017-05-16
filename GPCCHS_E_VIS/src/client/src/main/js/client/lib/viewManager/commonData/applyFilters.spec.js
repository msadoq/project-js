import _omit from 'lodash/omit';
import _assign from 'lodash/assign';

import '../../common/test';

import { applyFilters } from './applyFilters';

describe('utils/filters', () => {
  describe('applyFilters', () => {
    it('=', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '=',
          operand: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 43 } }, filter).should.equal(false);
    });
    it('!=', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '!=',
          operand: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 43 } }, filter).should.equal(true);
    });
    it('<', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '<',
          operand: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
    });
    it('>', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '>',
          operand: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(true);
    });
    it('<=', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '<=',
          operand: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
    });
    it('>=', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '>=',
          operand: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(true);
    });
    it('contains', () => {
      const filter = [
        {
          field: 'stringDataValue',
          operator: 'CONTAINS',
          operand: 'foo',
        },
      ];
      applyFilters({ stringDataValue: { type: 'string', value: 'foo' } }, filter)
        .should.equal(true);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar foo bar' } }, filter)
        .should.equal(true);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar' } }, filter)
        .should.equal(false);
      const regex = [
        {
          field: 'stringDataValue',
          operator: 'CONTAINS',
          operand: '/^FO*/i',
        },
      ];
      applyFilters({ stringDataValue: { type: 'string', value: 'foo bar' } }, regex)
        .should.equal(true);
    });
    it('icontains', () => {
      const filter = [
        {
          field: 'stringDataValue',
          operator: 'ICONTAINS',
          operand: 'foo',
        },
      ];
      applyFilters({ stringDataValue: { type: 'string', value: 'foo' } }, filter)
        .should.equal(false);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar foo bar' } }, filter)
        .should.equal(false);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar' } }, filter)
        .should.equal(true);
      const regex = [
        {
          field: 'stringDataValue',
          operator: 'ICONTAINS',
          operand: '/^FO*/i',
        },
      ];
      applyFilters({ stringDataValue: { type: 'string', value: 'foo bar' } }, regex)
        .should.equal(false);
    });
    it('multi', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '>',
          operand: 40,
        },
        {
          field: 'intDataValue',
          operator: '<=',
          operand: 49,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 30 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 41 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 49 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
    });
    it('invalid data', () => {
      const filter = [
        {
          field: 'intDataValue',
          operator: '=',
          operand: 42,
        },
      ];
      applyFilters({ otherField: { type: 'integer', value: '42' } }, filter).should.equal(true);
      applyFilters({ otherField: { type: 'integer', value: '43' } }, filter).should.equal(true);
    });
    it('invalid filter', () => {
      const filter = {
        field: 'intDataValue',
        operator: '=',
        operand: 42,
      };
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['field'])]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_assign({}, filter, { field: '' })]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['operator'])]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_assign({}, filter, { operator: '' })]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['field'])]).should.equal(true);
    });
  });
});
