// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// END-HISTORY
// ====================================================================

import { compare } from 'fast-json-patch';
import { REDUX_SYNCHRONIZATION_PATCH_KEY } from 'constants';
import patchReducer from './patchReducer';

describe('patchReducer', () => {
  test('returns same state if "regular action"', () => {
    const state = {};
    expect(patchReducer(state, undefined)).toBe(state);
    expect(patchReducer(state, {})).toBe(state);
    expect(patchReducer(state, { meta: {} })).toBe(state);
    expect(patchReducer(state, { meta: { [REDUX_SYNCHRONIZATION_PATCH_KEY]: {} } })).toBe(state);
    expect(patchReducer(state, { meta: { [REDUX_SYNCHRONIZATION_PATCH_KEY]: true } })).toBe(state);
    expect(patchReducer(state, { meta: { [REDUX_SYNCHRONIZATION_PATCH_KEY]: 'string' } }))
      .toBe(state);
  });
  test('applies patch if "patch action"', () => {
    const original = { a: 'a', b: 10, array: [10, 15] };
    const patched = { a: 'b', array: [20, 15, 30] };
    const patch = compare(original, patched);
    const s = expect(
      patchReducer(original, { meta: { [REDUX_SYNCHRONIZATION_PATCH_KEY]: patch } })
    );
    s.not.toBe(original);
    s.toMatchObject(patched);
  });
});
