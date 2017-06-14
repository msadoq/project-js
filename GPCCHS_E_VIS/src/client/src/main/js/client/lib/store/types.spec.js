import __ from 'lodash/fp';
import * as types from './types';

describe('store:types', () => {
  test('have same keys and same values', () => {
    __.toPairs(types).forEach(([key, value]) => {
      expect(key).toEqual(value);
    });
  });
});
