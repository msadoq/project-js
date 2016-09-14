require('../lib/utils/test');
const { resolveCacheFilters } = require('./filterInLoki');

const stringDataValue = 'TestData';

describe('filters', () => {
  describe('resolveCacheFilters', () => {
    it('OP_CONTAINS', () => {
      const filters = [{
        dataFullName: 'data',
        field: 'dataField',
        operator: 'OP_CONTAINS',
        value: stringDataValue,
      }];
      const resolvedFilters = resolveCacheFilters(filters);
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
      resolvedFilters.should.be.an('array').and.have.lengthOf(1);
      resolvedFilters[0].should.be.an('object').that.have.properties({
        'jsonPayload.dataField': { $containsNone: stringDataValue },
      });
    });
  });
});
