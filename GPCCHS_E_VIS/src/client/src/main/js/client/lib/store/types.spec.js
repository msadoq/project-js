import __ from 'lodash/fp';
import * as types from './types';

describe('store:types', () => {
  test.skip('have same keys and same values', () => {
    __.toPairs(types).forEach(([key, value]) => {
      expect(key).toEqual(value);
    });
  });
});
