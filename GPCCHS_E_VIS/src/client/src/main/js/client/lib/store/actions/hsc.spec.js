import _ from 'lodash/fp';
import { HEALTH_STATUS_CRITICAL } from '../../constants';
import * as actions from './hsc';
import { mockStore, freezeMe } from '../../common/test';

describe('store:actions:hsc', () => {
  const state = freezeMe({
    hsc: {
      focusWindow: 'w1',
    },
    windows: {
      w1: {
        focusedPage: 'p1',
      },
    },
    pages: {
      p1: {
        timebarUuid: 'tb1',
        panels: {
          editorIsMinimized: true,
        },
      },
    },
    timebars: {
      tb1: {},
      tb2: {},
    },
    health: {
      mainStatus: false,
      dcStatus: false,
      hssStatus: false,
      windowsStatus: {},
    },
  });

  const stateCriticalWindows = freezeMe({
    health: {
      mainStatus: false,
      dcStatus: false,
      hssStatus: false,
      windowsStatus: { a: HEALTH_STATUS_CRITICAL, b: null },
    },
  });

  const stateWithCodeEditor = freezeMe({
    editor: {
      textViewId: 'viewId',
    },
    health: {},
  });

  const stateWithEditorOpen = freezeMe({
    pages: {
      page1: {
        panels: {
          editorWidth: 100,
        },
      },
    },
    health: {},
  });

  describe('startInPlayMode', () => {
    const ifIsPlay = _.propEq('type', 'HSC_PLAY');
    const store = mockStore(state);
    store.dispatch(actions.startInPlayMode());
    it('sets real time to true on each timebars', () => {
      const rejectPlayActions = _.reject(ifIsPlay);
      expect(rejectPlayActions(store.getActions())).toEqual([
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: { timebarUuid: 'tb1', flag: true },
        },
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: { timebarUuid: 'tb2', flag: true },
        },
      ]);
    });
    it('plays', () => {
      const keepPlayActions = _.filter(ifIsPlay);
      expect(keepPlayActions(store.getActions())).toEqual([
        { type: 'HSC_PLAY', payload: { timebarUuid: 'tb1' } },
      ]);
    });
  });

  describe('smartPlay', () => {
    it('warns a message because of application is oveloaded', () => {
      const store = mockStore(stateCriticalWindows);
      store.dispatch(actions.smartPlay('myTimebarUuid'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'warning',
            messages: ['One process of the application is oveloaded, cannot switch to play'],
          },
        },
      ]);
    });
    it('warns a message because of code editor is opened', () => {
      const store = mockStore(stateWithCodeEditor);
      store.dispatch(actions.smartPlay('myTimebarUuid'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'warning',
            messages: ['Please close editors before play timebar'],
          },
        },
      ]);
    });
    it('warns a message because of editor is opened on page', () => {
      const store = mockStore(stateWithEditorOpen);
      store.dispatch(actions.smartPlay('myTimebarUuid'));
      expect(store.getActions()).toEqual([
        { type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'global',
            type: 'warning',
            messages: ['Please close editors before play timebar'],
          },
        },
      ]);
    });
    it('plays', () => {
      const store = mockStore(state);
      store.dispatch(actions.smartPlay('myTimebarUuid'));
      expect(store.getActions()).toEqual([
        { type: 'HSC_PLAY', payload: { timebarUuid: 'myTimebarUuid' } },
      ]);
    });
  });
});
