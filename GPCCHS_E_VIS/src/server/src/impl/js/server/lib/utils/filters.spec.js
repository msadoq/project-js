require('./test');
const {
  omit: _omit,
  assign: _assign,
} = require('lodash');
const { applyFilters } = require('./filters');
const { constants: globalConstants } = require('common');

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
      applyFilters({ intDataValue: 42 }, filter).should.equal(true);
      applyFilters({ intDataValue: 43 }, filter).should.equal(false);
    });
    it('OP_NE', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_NE,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: 42 }, filter).should.equal(false);
      applyFilters({ intDataValue: 43 }, filter).should.equal(true);
    });
    it('OP_LT', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_LT,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: 40 }, filter).should.equal(true);
      applyFilters({ intDataValue: 42 }, filter).should.equal(false);
      applyFilters({ intDataValue: 50 }, filter).should.equal(false);
    });
    it('OP_GT', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_GT,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: 40 }, filter).should.equal(false);
      applyFilters({ intDataValue: 42 }, filter).should.equal(false);
      applyFilters({ intDataValue: 50 }, filter).should.equal(true);
    });
    it('OP_LE', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_LE,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: 40 }, filter).should.equal(true);
      applyFilters({ intDataValue: 42 }, filter).should.equal(true);
      applyFilters({ intDataValue: 50 }, filter).should.equal(false);
    });
    it('OP_GE', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_GE,
          fieldValue: 42,
        },
      ];
      applyFilters({ intDataValue: 40 }, filter).should.equal(false);
      applyFilters({ intDataValue: 42 }, filter).should.equal(true);
      applyFilters({ intDataValue: 50 }, filter).should.equal(true);
    });
    it('OP_CONTAINS', () => {
      const filter = [
        {
          fieldName: 'stringDataValue',
          type: globalConstants.FILTERTYPE_CONTAINS,
          fieldValue: 'foo',
        },
      ];
      applyFilters({ stringDataValue: 'foo' }, filter).should.equal(true);
      applyFilters({ stringDataValue: 'bar foo bar' }, filter).should.equal(true);
      applyFilters({ stringDataValue: 'bar' }, filter).should.equal(false);
    });
    it('OP_ICONTAINS', () => {
      const filter = [
        {
          fieldName: 'stringDataValue',
          type: globalConstants.FILTERTYPE_ICONTAINS,
          fieldValue: 'foo',
        },
      ];
      applyFilters({ stringDataValue: 'foo' }, filter).should.equal(false);
      applyFilters({ stringDataValue: 'bar foo bar' }, filter).should.equal(false);
      applyFilters({ stringDataValue: 'bar' }, filter).should.equal(true);
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
      applyFilters({ intDataValue: 30 }, filter).should.equal(false);
      applyFilters({ intDataValue: 40 }, filter).should.equal(false);
      applyFilters({ intDataValue: 41 }, filter).should.equal(true);
      applyFilters({ intDataValue: 49 }, filter).should.equal(true);
      applyFilters({ intDataValue: 50 }, filter).should.equal(false);
    });
    it('invalid data', () => {
      const filter = [
        {
          fieldName: 'intDataValue',
          type: globalConstants.FILTERTYPE_EQ,
          fieldValue: 42,
        },
      ];
      applyFilters({ otherField: 42 }, filter).should.equal(true);
      applyFilters({ otherField: 43 }, filter).should.equal(true);
    });
    it('invalid filter', () => {
      const filter = {
        fieldName: 'intDataValue',
        type: globalConstants.FILTERTYPE_EQ,
        fieldValue: 42,
      };
      applyFilters({ intDataValue: 50 }, [_omit(filter, ['fieldName'])]).should.equal(true);
      applyFilters({ intDataValue: 50 }, [_assign({}, filter, { fieldName: '' })]).should.equal(true);
      applyFilters({ intDataValue: 50 }, [_omit(filter, ['type'])]).should.equal(true);
      applyFilters({ intDataValue: 50 }, [_assign({}, filter, { type: '' })]).should.equal(true);
      applyFilters({ intDataValue: 50 }, [_omit(filter, ['fieldValue'])]).should.equal(true);
    });
  });
});
