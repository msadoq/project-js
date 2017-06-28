import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { freezeMe } from '../../../common/jest';
import * as types from '../../types';
import createPlayerMiddleware from '.';

const timebarFixture = {
  mode: 'Normal',
  slideWindow: { lower: 1498642826647, upper: 1498643156647 },
  visuWindow: {
    current: 1498643156647,
    defaultWidth: 900000,
    lower: 1498642826647,
    upper: 1498643156647,
  },
};

const play = () => ({ type: types.HSC_PLAY });
const pause = () => ({ type: types.HSC_PAUSE });

describe('store:middlewares:player', () => {
  jest.useFakeTimers();
  const middlewares = [thunk, createPlayerMiddleware()];
  const mockStore = _.compose(configureMockStore(middlewares), freezeMe);

  describe('play/pause', () => {
    test('cannot play if a code editor is opened', () => {
      const store = mockStore({ health: {}, codeEditor: { viewId: 'UUID' } });
      store.dispatch(play());
      expect(store.getActions()).toMatchSnapshot();
    });
    test('cannot play if an editor is opened', () => {
      const state = { health: {}, pages: { p1: { panels: { editorIsMinimized: false } } } };
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
    test('play update cursors at regular intervals until pause', () => {
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
  });
});
