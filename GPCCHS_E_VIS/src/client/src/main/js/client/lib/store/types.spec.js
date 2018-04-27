// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Write a simple unit test about action types
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Cleanup client/ file organization and test helper
//  modules
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 2.0.0 : FA : ISIS-FT-2309 : 14/11/2017 : Skip / fix unit tests
// VERSION : 2.0.0 : FA : #7813 : 02/01/2018 : fix test & constant naming
// END-HISTORY
// ====================================================================

import __ from 'lodash/fp';
import * as types from './types';

describe('store:types', () => {
  test('have same keys and same values', () => {
    __.toPairs(types).forEach(([key, value]) => {
      expect(key).toEqual(value);
    });
  });
});
