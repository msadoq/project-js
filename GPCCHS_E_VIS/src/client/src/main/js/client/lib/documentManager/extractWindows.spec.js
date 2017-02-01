import _ from 'lodash';
import extractWindows from './extractWindows';
import { should } from '../common/test';

describe('documents/lib', () => {
  describe('extractWindows ', () => {
    it('ok', () => {
      const content = { __original: { windows: [{
        type: 'documentWindow',
        val: 'val1'
      }, {
        type: 'sideWindow'
      }, {
        type: 'otherWindow'
      }, {
        type: 'documentWindow',
        val: 'val2'
      }] } };
      extractWindows(content, (err, w) => {
        should.not.exist(err);
        w.should.have.keys('__original', 'windows');
        Object.keys(w.windows).should.have.length(2);
        _.each(w.windows, (v, k) => {
          v.uuid.should.equal(k);
        });
      });
    });
    it('not Array', () => {
      const content = { __original: { windows: 'not an array' } };
      extractWindows(content, (err, w) => {
        should.not.exist(err);
        w.should.have.keys('__original', 'windows');
        Object.keys(w.windows).should.have.length(0);
      });
    });
    it('no documentWindow', () => {
      const content = { __original: { windows: [{
        type: 'sideWindow',
        val: 'val1'
      }, {
        type: 'sideWindow'
      }, {
        type: 'otherWindow'
      }, {
        type: 'otherWindow',
        val: 'val2'
      }] } };
      extractWindows(content, (err, w) => {
        should.not.exist(err);
        w.should.have.keys('__original', 'windows');
        Object.keys(w.windows).should.have.length(0);
      });
    });
  });
});
