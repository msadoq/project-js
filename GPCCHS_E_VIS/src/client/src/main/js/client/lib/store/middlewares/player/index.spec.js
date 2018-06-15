// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add basic test about player middleware
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Add play/pause tests about player middleware
// VERSION : 1.1.2 : DM : #6700 : 28/06/2017 : Player middleware : Write all others tests
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : FA : ISIS-FT-2241 : 29/11/2017 : editeur et multi pages VIMA // fix unit tests
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2254 : 14/12/2017 : mode normal timeBar VIMA .
// VERSION : 2.0.0 : FA : ISIS-FT-2241 : 25/01/2018 : editeur et multi pages VIMA .
// VERSION : 2.0.0 : FA : ISIS-FT-2241 : 01/02/2018 : Allow to play when an editor is opened
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { freezeMe } from 'common/jest';
import * as types from 'store/types';
import makePlayerMiddleware from '.';

const timebarFixture = {
  mode: 'Normal',
  speed: 2,
  slideWindow: { lower: 1498642826647, upper: 1498643156647 },
  visuWindow: {
    current: 1498643156647,
    defaultWidth: 900000,
    lower: 1498642826647,
    upper: 1498643156647,
  },
};

const play = () => ({ type: types.HSC_PLAY, payload: { timebarUuid: null } });
const pause = () => ({ type: types.HSC_PAUSE });
// const openEditor = () => ({ type: types.WS_PAGE_PANELS_LOAD_IN_EDITOR });
const focusPage = pageId => ({
  type: types.WS_WINDOW_PAGE_FOCUS,
  payload: { pageId },
});

const enableRealTime = timebarUuid => ({
  type: types.WS_TIMEBAR_SET_REALTIME,
  payload: { timebarUuid, flag: true },
});

const goNow = timebarUuid => ({
  type: types.WS_TIMEBAR_GO_NOW,
  payload: { timebarUuid },
});

jest.mock('../../../serverProcess/ipc', () => ({
  dc: {
    requestSessionTime: (sessionId, cb) => cb({ timestamp: 1337 }),
  },
}));


let state = {
  hsc: { focusWindow: 'w1' },
  windows: { w1: { pages: ['p1'] } },
  health: {},
  pages: { p1: { panels: { editorIsMinimized: false } } },
};

describe('store:middlewares:player', () => {
  jest.useFakeTimers();
  const middlewares = [thunk, makePlayerMiddleware()];
  const mockStore = _.compose(configureMockStore(middlewares), freezeMe);

  describe('play/pause', () => {
    test('cannot play if no page has a focus', () => {
      state = { ...state, hsc: {} };
      const store = mockStore(state);
      store.dispatch(play());
      expect(store.getActions()).toMatchSnapshot();
    });
    test('cannot play if a health status is critical', () => {
      const store = mockStore({ health: { mainStatus: 'CRITICAL' } });
      store.dispatch(play());
      expect(store.getActions()).toMatchSnapshot();
    });
    test('does not update cursors when no playingTimebarId', () => {
      const store = mockStore({ health: {}, hsc: { playingTimebarId: null } });
      store.dispatch(play());
      jest.runOnlyPendingTimers();
      store.dispatch(pause());
      expect(store.getActions()).toMatchSnapshot();
    });
    test('does not update cursors when playing timebar does not exist', () => {
      const store = mockStore({ health: {}, hsc: { playingTimebarId: 'tb1' }, timebars: {} });
      store.dispatch(play());
      jest.runOnlyPendingTimers();
      store.dispatch(pause());
      expect(store.getActions()).toMatchSnapshot();
    });
    test('simple play and pause', () => {
      const store = mockStore({ health: {} });
      store.dispatch(play());
      store.dispatch(pause());
      expect(store.getActions()).toMatchSnapshot();
    });
    test('play non-real-time update cursors at regular intervals until pause', () => {
      const store = mockStore({
        health: {},
        hsc: { playingTimebarId: 'tb1' },
        timebars: { tb1: timebarFixture },
        messages: {},
      });
      store.dispatch(play());
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      store.dispatch(pause());

      jest.runAllTimers();
      expect(store.getActions()).toMatchSnapshot();
    });
    test('play real-time update cursors at regular intervals until pause', () => {
      const store = mockStore({
        health: {},
        hsc: { playingTimebarId: 'tb1' },
        timebars: { tb1: { ...timebarFixture, realTime: true } },
        messages: {},
      });

      store.dispatch(play());
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      store.dispatch(pause());

      jest.runAllTimers();

      // what to test ? Hard to say...
    });
  });

  describe('when focus a page', () => {
    const state2 = {
      hsc: { playingTimebarId: 'tb1' },
      pages: { p1: { timebarUuid: 'tb1' }, p2: { timebarUuid: 'tb2' } },
    };
    test('dispatch a HSC_PAUSE action if new page has another timebar', () => {
      const store = mockStore(state2);
      store.dispatch(focusPage('p2'));
      expect(store.getActions()).toMatchSnapshot();
    });
    test('do nothing if new page has same timebar', () => {
      const store = mockStore(state2);
      store.dispatch(focusPage('p1'));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('when enable real time mode', () => {
    test('request session time and switch to real time', () => {
      const store = mockStore({ health: {}, messages: {}, timebars: { tb1: timebarFixture } });
      store.dispatch(enableRealTime('tb1'));
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  describe('when click on NOW button', () => {
    test('request session time and update cursors corresponding to this time', () => {
      const store = mockStore({ health: {}, messages: {}, timebars: { tb1: timebarFixture } });
      store.dispatch(goNow('tb1'));
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
