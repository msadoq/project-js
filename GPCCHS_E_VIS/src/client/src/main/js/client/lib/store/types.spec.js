import __ from 'lodash/fp';
import {} from '../common/test';
import * as types from './types';

describe('store:types', () => {
  it('have same keys and same values', () => {
    __.toPairs(types).forEach(([key, value]) => {
      key.should.be.eql(value);
    });
  });
});
