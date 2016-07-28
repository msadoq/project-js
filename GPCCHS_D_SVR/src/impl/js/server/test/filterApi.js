const debug = require('../lib/io/debug')('test:jsonCacheApi');
const jsonCacheApi = require('../lib/dataCache/lib/jsonCacheApi');
const chai = require('chai');
const should = chai.should();
const { jsonCache } = require('../lib/io/loki');

const subHeader = { DataFullName: 'a', SessionId: 0, DomainId: 0 };
const subInterval = { VisuWindow: { dInf: 0, dSup: 10 } };
const sub = Object.assign({}, subHeader, subInterval);

describe('jsonCacheApi', () => {
  describe('resolveFilters', () => {
    it('operators', () => {
      const filters = [{
        DataFullName: 'data',
        Operator: 'OP_CONTAINS',
        Value: 42,
      }];
      const resolvedFilter = jsonCacheApi.resolveFilters(filters);
      debug.info(resolvedFilter);
      //resolvedOperator.should.be.an('string').that.equal('$eq');
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
