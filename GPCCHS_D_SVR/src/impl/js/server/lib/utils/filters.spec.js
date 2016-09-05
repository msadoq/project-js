require('./test');
const _ = require('lodash');
const applyFilters = require('./filters');
const constants = require('../constants');

describe('filters', () => {
  it('OP_EQ', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_EQ,
        value: 42,
      },
    ];
    applyFilters({ intDataValue: 42 }, filter).should.equal(true);
    applyFilters({ intDataValue: 43 }, filter).should.equal(false);
  });
  it('OP_NE', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_NE,
        value: 42,
      },
    ];
    applyFilters({ intDataValue: 42 }, filter).should.equal(false);
    applyFilters({ intDataValue: 43 }, filter).should.equal(true);
  });
  it('OP_LT', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_LT,
        value: 42,
      },
    ];
    applyFilters({ intDataValue: 40 }, filter).should.equal(true);
    applyFilters({ intDataValue: 42 }, filter).should.equal(false);
    applyFilters({ intDataValue: 50 }, filter).should.equal(false);
  });
  it('OP_GT', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_GT,
        value: 42,
      },
    ];
    applyFilters({ intDataValue: 40 }, filter).should.equal(false);
    applyFilters({ intDataValue: 42 }, filter).should.equal(false);
    applyFilters({ intDataValue: 50 }, filter).should.equal(true);
  });
  it('OP_LE', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_LE,
        value: 42,
      },
    ];
    applyFilters({ intDataValue: 40 }, filter).should.equal(true);
    applyFilters({ intDataValue: 42 }, filter).should.equal(true);
    applyFilters({ intDataValue: 50 }, filter).should.equal(false);
  });
  it('OP_GE', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_GE,
        value: 42,
      },
    ];
    applyFilters({ intDataValue: 40 }, filter).should.equal(false);
    applyFilters({ intDataValue: 42 }, filter).should.equal(true);
    applyFilters({ intDataValue: 50 }, filter).should.equal(true);
  });
  it('OP_CONTAINS', () => {
    const filter = [
      {
        field: 'stringDataValue',
        operator: constants.FILTEROPERATOR_CONTAINS,
        value: 'foo',
      },
    ];
    applyFilters({ stringDataValue: 'foo' }, filter).should.equal(true);
    applyFilters({ stringDataValue: 'bar foo bar' }, filter).should.equal(true);
    applyFilters({ stringDataValue: 'bar' }, filter).should.equal(false);
  });
  it('OP_ICONTAINS', () => {
    const filter = [
      {
        field: 'stringDataValue',
        operator: constants.FILTEROPERATOR_ICONTAINS,
        value: 'foo',
      },
    ];
    applyFilters({ stringDataValue: 'foo' }, filter).should.equal(false);
    applyFilters({ stringDataValue: 'bar foo bar' }, filter).should.equal(false);
    applyFilters({ stringDataValue: 'bar' }, filter).should.equal(true);
  });
  it('multi', () => {
    const filter = [
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_GT,
        value: 40,
      },
      {
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_LE,
        value: 49,
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
        field: 'intDataValue',
        operator: constants.FILTEROPERATOR_EQ,
        value: 42,
      },
    ];
    applyFilters({ otherField: 42 }, filter).should.equal(true);
    applyFilters({ otherField: 43 }, filter).should.equal(true);
  });
  it('invalid filter', () => {
    const filter = {
      field: 'intDataValue',
      operator: constants.FILTEROPERATOR_EQ,
      value: 42,
    };
    applyFilters({ intDataValue: 50 }, [_.omit(filter, ['field'])]).should.equal(true);
    applyFilters({ intDataValue: 50 }, [_.assign({}, filter, { field: '' })]).should.equal(true);
    applyFilters({ intDataValue: 50 }, [_.omit(filter, ['operator'])]).should.equal(true);
    applyFilters({ intDataValue: 50 }, [_.assign({}, filter, { operator: '' })]).should.equal(true);
    applyFilters({ intDataValue: 50 }, [_.omit(filter, ['value'])]).should.equal(true);
  });
});
