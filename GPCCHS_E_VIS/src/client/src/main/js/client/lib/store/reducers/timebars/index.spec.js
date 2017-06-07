/* eslint no-unused-expressions: 0 */
import { should, freezeArgs, getStore } from '../../../common/test';
import * as types from '../../types';
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
  it('initial state', () => {
    expect(typeof reducer(undefined, {})).toHaveLength(0);
  });
  it('unknown action', () => {
    expect(reducer({ tb1: { id: 'tb1' } }, { payload: { timebarUuid: 'tb1' } })).toEqual({ tb1: { id: 'tb1' } });
  });
  it('pause disable realTime', () => {
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
    it('close', () => {
      const newState = reducer(state, { type: types.HSC_CLOSE_WORKSPACE });
      expect(typeof newState).toHaveLength(0);
    });
  });
});

/* --- Selectors ------------------------------------------------------------ */
describe('store:timebars:selectors', () => {
  it('getTimebar', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    expect(getTimebar(getState(), { timebarUuid: 'myTimebarId' })).toHaveProperty('id', 'Id');
    expect(getTimebar(getState(), { timebarUuid: 'unknownId' })).toBeFalsy();
  });
  it('getTimebarId', () => {
    const { getState } = getStore({
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    });
    expect(getTimebarId(getState(), { timebarUuid: 'myTimebarId' })).toEqual('Id');
    expect(getTimebarId(getState(), { timebarUuid: 'unknownId' })).toBeFalsy();
  });
  it('getTimebars', () => {
    const state = {
      timebars: {
        myTimebarId: { id: 'Id' },
      },
    };
    const { getState } = getStore(state);
    expect(getTimebars(getState())).toEqual(state.timebars);
  });
  it('getFirstTimebarId', () => {
    const state = {
      timebars: { aaa: {} },
    };
    const { getState } = getStore(state);
    expect(getFirstTimebarId(getState())).toEqual('aaa');
  });
  it('getTimebarMasterId', () => {
    const state = {
      timebars: {
        tb1: {
          masterId: 'master id',
          foo: 'bar',
        },
      },
    };
    expect(getTimebarMasterId(state, { timebarUuid: 'tb1' })).toEqual('master id');
  });
});
