const debug = require('../../lib/io/debug')('test:dataCache:filterApi');
require('../../lib/utils/test');
const { resolveCacheFilters, matchFilters } = require('../../lib/dataCache/lib/filterApi');

const intDataValue = 42;
const stringDataValue = 'TestData';
const newIntData = () => Object.assign({}, { intDataValue });
const newStringData = () => Object.assign({}, { stringDataValue });

describe('jsonCacheApi', () => {
  describe('resolveCacheFilters', () => {
    it('OP_CONTAINS', () => {
      const filters = [{
        dataFullName: 'data',
        field: 'dataField',
        operator: 'OP_CONTAINS',
        value: stringDataValue,
      }];
      const resolvedFilters = resolveCacheFilters(filters);
      debug.info(resolvedFilters);
      resolvedFilters.should.be.an('array').and.have.lengthOf(1);
      resolvedFilters[0].should.be.an('object').that.have.properties({
        'jsonPayload.dataField': { $contains: stringDataValue },
      });
    });
    it('OP_ICONTAINS', () => {
      const filters = [{
        dataFullName: 'data',
        field: 'dataField',
        operator: 'OP_ICONTAINS',
        value: stringDataValue,
      }];
      const resolvedFilters = resolveCacheFilters(filters);
      debug.info(resolvedFilters);
      resolvedFilters.should.be.an('array').and.have.lengthOf(1);
      resolvedFilters[0].should.be.an('object').that.have.properties({
        'jsonPayload.dataField': { $containsNone: stringDataValue },
      });
    });
  });

  describe('matchFilters', () => {
    it('OP_EQ', () => {
      const data = newIntData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'intDataValue',
            operator: 'OP_EQ',
            value: intDataValue,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(true);
    });
    it('OP_NE', () => {
      const data = newIntData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'intDataValue',
            operator: 'OP_NE',
            value: intDataValue,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(false);
    });
    it('OP_LT', () => {
      const data = newIntData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'intDataValue',
            operator: 'OP_LT',
            value: intDataValue + 1,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(true);
    });
    it('OP_LE', () => {
      const data = newIntData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'intDataValue',
            operator: 'OP_LE',
            value: intDataValue,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(true);
    });
    it('OP_GT', () => {
      const data = newIntData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'intDataValue',
            operator: 'OP_GT',
            value: intDataValue - 1,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(true);
    });
    it('OP_GE', () => {
      const data = newIntData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'intDataValue',
            operator: 'OP_GE',
            value: intDataValue,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(true);
    });
    it('OP_CONTAINS', () => {
      const data = newStringData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'stringDataValue',
            operator: 'OP_CONTAINS',
            value: stringDataValue,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(true);
    });
    it('OP_ICONTAINS', () => {
      const data = newStringData();
      const subscription = {
        filter: [
          {
            dataFullName: stringDataValue,
            field: 'stringDataValue',
            operator: 'OP_ICONTAINS',
            value: stringDataValue,
          },
        ],
      };
      const isMatching = matchFilters(data, subscription);
      isMatching.should.be.an('boolean').that.equal(false);
    });

  });
});

/* describe('async', () => {
  it('fake', done => {
    setTimeout(() => {
      done();
    }, 1500);
  });
}); */
