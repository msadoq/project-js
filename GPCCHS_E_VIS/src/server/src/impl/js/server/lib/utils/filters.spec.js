// eslint-disable-next-line no-underscore-dangle
const _omit = require('lodash/omit');
// eslint-disable-next-line no-underscore-dangle
const _assign = require('lodash/assign');

// eslint-disable-next-line import/no-extraneous-dependencies
const globalConstants = require('common/constants');

require('./test');

const { applyFilters } = require('./filters');

describe('utils/filters', () => {
  describe('applyFilters', () => {
    it('OP_EQ', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_EQ,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 43 } }, filter).should.equal(false);
    });
    it('OP_NE', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_NE,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 43 } }, filter).should.equal(true);
    });
    it('OP_LT', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_LT,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
    });
    it('OP_GT', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_GT,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(true);
    });
    it('OP_LE', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_LE,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(false);
    });
    it('OP_GE', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_GE,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: { type: 'integer', value: 40 } }, filter).should.equal(false);
      applyFilters({ intDataValue: { type: 'integer', value: 42 } }, filter).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, filter).should.equal(true);
    });
    it('OP_CONTAINS', () => {
      const filter = [
        {
          fieldName: 'stringDataValue',
          type: globalConstants.FILTERTYPE_CONTAINS,
          fieldValue: 'foo',
        },
      ];
      applyFilters({ stringDataValue: { type: 'string', value: 'foo' } }, filter).should.equal(true);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar foo bar' } }, filter).should.equal(true);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar' } }, filter).should.equal(false);
    });
    it('OP_ICONTAINS', () => {
      const filter = [
        {
          fieldName: 'stringDataValue',
          type: globalConstants.FILTERTYPE_ICONTAINS,
          fieldValue: 'foo',
        },
      ];
      applyFilters({ stringDataValue: { type: 'string', value: 'foo' } }, filter).should.equal(false);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar foo bar' } }, filter).should.equal(false);
      applyFilters({ stringDataValue: { type: 'string', value: 'bar' } }, filter).should.equal(true);
    });
    it('multi', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_GT,
          fieldValue: 40,
        },
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_LE,
          fieldValue: 49,
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
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_EQ,
          fieldValue: 42,
        },
      ];
      applyFilters({ otherField: { type: 'integer', value: '42' } }, filter).should.equal(true);
      applyFilters({ otherField: { type: 'integer', value: '43' } }, filter).should.equal(true);
    });
    it('invalid filter', () => {
      const filter = {
        fieldName: 'intDataValue',
        type: globalConstants.FILTERTYPE_EQ,
        fieldValue: 42,
      };
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['fieldName'])]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_assign({}, filter, { fieldName: '' })]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['type'])]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_assign({}, filter, { type: '' })]).should.equal(true);
      applyFilters({ intDataValue: { type: 'integer', value: 50 } }, [_omit(filter, ['fieldValue'])]).should.equal(true);
    });
  });
});
