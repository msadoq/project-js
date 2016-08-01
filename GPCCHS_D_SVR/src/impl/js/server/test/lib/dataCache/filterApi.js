const debug = require('../../../lib/io/debug')('test:dataCache:jsonCacheApi');
const { chai, should } = require('../../utils');

const filterApi = require('../../../lib/dataCache/lib/filterApi');
const { jsonCache } = require('../../../lib/io/loki');

describe('jsonCacheApi', () => {
  describe('resolveFilters', () => {
    it('operators', () => {
      const filters = [{
        dataFullName: 'data',
        operator: 'OP_CONTAINS',
        value: 42,
      }];
      const resolvedFilter = filterApi.resolveCacheFilters(filters);
      debug.info(resolvedFilter);
      // resolvedOperator.should.be.an('string').that.equal('$eq');
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
