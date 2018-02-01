// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebarMasterId simple selector in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getFirstTimebarId simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getTimebarId selector . .
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/reducers
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

/* eslint no-unused-expressions: 0 */
import { freezeArgs, freezeMe } from 'common/jest';
import * as types from 'store/types';
import timebarsReducer, {
  getTimebar,
  getTimebarId,
  getTimebars,
  getFirstTimebarId,
  getTimebarMasterId,
} from '.';

const reducer = freezeArgs(timebarsReducer);

/* --- Reducer -------------------------------------------------------------- */
describe('store:timebars:reducer', () => {
  test('initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  test('unknown action', () => {
    expect(reducer({ tb1: { id: 'tb1' } }, { payload: { timebarUuid: 'tb1' } })).toEqual({ tb1: { id: 'tb1' } });
  });
  test('pause disable realTime', () => {
    expect(
      reducer({ tb1: { realTime: true }, tb2: { realTime: false } }, { type: types.HSC_PAUSE })
    ).toEqual({ tb1: { realTime: false }, tb2: { realTime: false } });
  });
  describe('HSC workspace', () => {
    const state = {
      tb1: {
        id: 'tb1',
        visuWindow: {
          lower: 200,
          upper: 400,
          current: 300,
          defauttWidth: 600,
        },
        slideWindow: { lower: 250, upper: 350 },
      },
    };
    test('close', () => {
      const newState = reducer(state, { type: types.HSC_CLOSE_WORKSPACE });
      expect(newState).toEqual({});
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:timebars:selectors', () => {
  test('getTimebar', () => {
    const state = freezeMe({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    expect(getTimebar(state, { timebarUuid: 'myTimebarId' })).toHaveProperty('id', 'Id');
    expect(getTimebar(state, { timebarUuid: 'unknownId' })).toBeFalsy();
  });
  test('getTimebarId', () => {
    const state = freezeMe({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    expect(getTimebarId(state, { timebarUuid: 'myTimebarId' })).toEqual('Id');
    expect(getTimebarId(state, { timebarUuid: 'unknownId' })).toBeFalsy();
  });
  test('getTimebars', () => {
    const state = freezeMe({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    expect(getTimebars(state)).toEqual(state.timebars);
  });
  test('getFirstTimebarId', () => {
    const state = freezeMe({
      timebars: { aaa: {} },
    });
    expect(getFirstTimebarId(state)).toEqual('aaa');
  });
  test('getTimebarMasterId', () => {
    const state = freezeMe({
      timebars: {
        tb1: {
          masterId: 'master id',
          foo: 'bar',
        },
      },
    });
    expect(getTimebarMasterId(state, { timebarUuid: 'tb1' })).toEqual('master id');
  });
});
