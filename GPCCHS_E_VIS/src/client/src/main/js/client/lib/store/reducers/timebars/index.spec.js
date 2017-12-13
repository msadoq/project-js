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
