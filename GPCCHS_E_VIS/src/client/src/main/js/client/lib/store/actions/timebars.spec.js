import { mockStore, freezeMe } from 'common/jest';
import * as actions from './timebars';

describe('store:actions:timebars', () => {
  const state = freezeMe({
    hsc: {
      playingTimebarId: 'tb1',
    },
    messages: {
      'timeSetter-tb3': ['1', '2', '3', '4'],
    },
    timebars: {
      tb1: {
        mode: 'Extensible',
        masterId: 'masterId',
        visuWindow: { lower: 100, current: 150, upper: 117200000 },
        slideWindow: { lower: 160, upper: 170 },
        speed: 1,
        realTime: true,
      },
      tb2: {
        mode: 'Normal',
        speed: 2,
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
      },
      tb3: {
        mode: 'Normal',
        speed: 1,
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
      },
      tb4: {
        mode: 'Fixed',
        speed: 2,
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 400 },
      },
      tb5: {
        mode: 'Normal',
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 170 },
      },
      tb6: {
        mode: 'Fixed',
        visuWindow: { lower: 100, current: 150, upper: 200 },
        slideWindow: { lower: 160, upper: 400 },
        realTime: true,
      },
      tb7: {
        mode: 'Fixed',
        visuWindow: { lower: 100, current: 120, upper: 200, defaultWidth: 50 },
        slideWindow: { lower: 160, upper: 400 },
        realTime: false,
      },
      tb8: {
        mode: 'Fixed',
        visuWindow: { lower: 110, current: 120, upper: 160, defaultWidth: 50 },
        slideWindow: { lower: 110, upper: 160 },
        realTime: false,
      },
    },
    timelines: {
      tl1: { id: 'myTimelineId', sessionId: 1 },
      invalidSessionId: { id: 'myTimelineId', sessionId: 'string' },
      invalidId: { sessionId: 1 },
      other: { id: 'other', sessionId: 1 },
      tl2: { id: 'myOtherTimelineId', sessionId: 2 },
    },
    timebarTimelines: {
      tb1: ['tl1', 'tl2'],
      myOtherId: ['other'],
    },
    health: {},
  });
  const store = mockStore(state);

  afterEach(() => {
    store.clearActions();
  });

  describe('updateCursors', () => {
    test('updates cursors (Extensible)', () => {
      store.dispatch(actions.updateCursors('tb1', {}, {}));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {},
            slideWindow: { lower: 100, upper: 117200000 },
            timebarUuid: 'tb1',
          },
        },
      ]);
    });
    test('updates cursors (Fixed)', () => {
      const visuWindow = { lower: 1, upper: 400, current: 250 };
      const slideWindow = { lower: 100, upper: 200 };
      store.dispatch(actions.updateCursors('tb2', visuWindow, slideWindow));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: 1, upper: 400, current: 250 },
            slideWindow: { lower: 100, upper: 400 },
            timebarUuid: 'tb2',
          },
        },
      ]);
    });
    test('reset messages and updates cursors', () => {
      store.dispatch(actions.updateCursors('tb3', {}, {}));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_MESSAGE_RESET',
          payload: {
            containerId: 'timeSetter-tb3',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {},
            slideWindow: { lower: 100, upper: 170 },
            timebarUuid: 'tb3',
          },
        },
      ]);
    });
    test('dispatches a pause + 2 errors messages', () => {
      const visuWindow = { lower: 200, upper: 1, current: 100 };
      const slideWindow = { lower: 100, upper: 200 };
      store.dispatch(actions.updateCursors('tb2', visuWindow, slideWindow));
      expect(store.getActions()).toMatchObject([
        { type: 'HSC_PAUSE', payload: {} },
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'timeSetter-tb2',
            type: 'error',
            messages: [{ content: 'Lower cursor must be before current cursor' }],
          },
        },
        {
          type: 'WS_MESSAGE_ADD',
          payload: {
            containerId: 'timeSetter-tb2',
            type: 'error',
            messages: [{ content: 'Current cursor must be before upper cursor' }],
          },
        },
      ]);
    });
  });

  describe('updateSpeed', () => {
    test('disables real time then update speed', () => {
      store.dispatch(actions.updateSpeed('tb1', 42));
      expect(store.getActions()).toEqual([
        { type: 'WS_TIMEBAR_SET_REALTIME', payload: { timebarUuid: 'tb1', flag: false } },
        { type: 'WS_TIMEBAR_SPEED_UPDATE', payload: { timebarUuid: 'tb1', speed: 42 } },
      ]);
    });
    test('updates speed', () => {
      store.dispatch(actions.updateSpeed('tb2', 42));
      expect(store.getActions()).toEqual([
        { type: 'WS_TIMEBAR_SPEED_UPDATE', payload: { timebarUuid: 'tb2', speed: 42 } },
      ]);
    });
  });
  describe('restoreWidth', () => {
    test('disables real time then restore width', () => {
      store.dispatch(actions.restoreWidth('tb1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: { timebarUuid: 'tb1', flag: false },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: NaN, upper: NaN },
            slideWindow: { lower: 100, upper: 117200000 },
            timebarUuid: 'tb1',
          },
        },
      ]);
    });
    test('dispatches a WS_MESSAGE_RESET and restores width', () => {
      store.dispatch(actions.restoreWidth('tb3'));
      expect(store.getActions()).toEqual([
        { type: 'WS_MESSAGE_RESET', payload: { containerId: 'timeSetter-tb3' } },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: NaN, upper: NaN },
            slideWindow: { lower: 100, upper: 170 },
            timebarUuid: 'tb3',
          },
        },
      ]);
    });
    test('dispatches a WS_MESSAGE_RESET and restores width', () => {
      store.dispatch(actions.restoreWidth('tb7'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: 110, upper: 160 },
            slideWindow: { lower: 110, upper: 160 },
            timebarUuid: 'tb7',
          },
        },
      ]);
    });
    test('dispatches a WS_MESSAGE_RESET and restores width', () => {
      store.dispatch(actions.restoreWidth('tb8'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: 110, upper: 160 },
            slideWindow: { lower: 110, upper: 160 },
            timebarUuid: 'tb8',
          },
        },
      ]);
    });
  });
  describe('jump', () => {
    test('disables real time then jump', () => {
      store.dispatch(actions.jump('tb1', 42));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: { timebarUuid: 'tb1', flag: false },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: 142, upper: 117200042, current: 192 },
            slideWindow: { lower: 142, upper: 117200042 },
            timebarUuid: 'tb1',
          },
        },
      ]);
    });
    test('dispatches a WS_MESSAGE_RESET and jumps', () => {
      store.dispatch(actions.jump('tb3', 42));
      expect(store.getActions()).toEqual([
        { type: 'WS_MESSAGE_RESET', payload: { containerId: 'timeSetter-tb3' } },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: { lower: 142, upper: 242, current: 192 },
            slideWindow: { lower: 142, upper: 212 },
            timebarUuid: 'tb3',
          },
        },
      ]);
    });
  });
  describe('moveTo', () => {
    test('disables real time and pause then go now', () => {
      store.dispatch(actions.moveTo('tb1', 42));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: {
            timebarUuid: 'tb1',
            flag: false,
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {
              lower: -105479868,
              upper: 11720032,
              current: 42,
            },
            slideWindow: {
              lower: -105479868,
              upper: 11720032,
            },
            timebarUuid: 'tb1',
          },
        },
      ]);
    });
    test('pauses and add an error message', () => {
      store.dispatch(actions.moveTo('tb3', 42));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_MESSAGE_RESET',
          payload: {
            containerId: 'timeSetter-tb3',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {
              lower: -48,
              upper: 52,
              current: 42,
            },
            slideWindow: {
              lower: -48,
              upper: 52,
            },
            timebarUuid: 'tb3',
          },
        },
      ]);
    });
  });
  describe('switchToNormalMode', () => {
    test('updates to normal mode', () => {
      store.dispatch(actions.switchToNormalMode('tb3'));
      expect(store.getActions()).toEqual([
        { type: 'WS_TIMEBAR_MODE_UPDATE', payload: { timebarUuid: 'tb3', mode: 'Normal' } },
      ]);
    });
    test('updates mode to normal and update cursors', () => {
      store.dispatch(actions.switchToNormalMode('tb4'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: { timebarUuid: 'tb4', mode: 'Normal' },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: null,
            slideWindow: { lower: 100, upper: 175 },
            timebarUuid: 'tb4',
          },
        },
      ]);
    });
  });
  describe('switchToRealtimeMode', () => {
    test('sets real time mode and update cursors + smartPlay', () => {
      store.dispatch(actions.switchToRealtimeMode('tb3', 1));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_MESSAGE_RESET',
          payload: {
            containerId: 'timeSetter-tb3',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {
              lower: -89,
              upper: 11,
              current: 1,
            },
            slideWindow: {
              lower: -89,
              upper: 11,
            },
            timebarUuid: 'tb3',
          },
        },
        {
          type: 'HSC_PLAY',
          payload: {
            timebarUuid: 'tb3',
          },
        },
      ]);
    });
    test('sets real time mode, reset speed to 1 and update cursors + smartPlay', () => {
      store.dispatch(actions.switchToRealtimeMode('tb2', 1));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_SPEED_UPDATE',
          payload: {
            timebarUuid: 'tb2',
            speed: 1,
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {
              lower: -89,
              upper: 11,
              current: 1,
            },
            slideWindow: {
              lower: -89,
              upper: 11,
            },
            timebarUuid: 'tb2',
          },
        },
        {
          type: 'HSC_PLAY',
          payload: {
            timebarUuid: 'tb2',
          },
        },
      ]);
    });
    test('sets real time mode, reset mode to Normal and update cursors + smartPlay', () => {
      store.dispatch(actions.switchToRealtimeMode('tb1', 1));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb1',
            mode: 'Normal',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {
              lower: -105479909,
              upper: 11719991,
              current: 1,
            },
            slideWindow: {
              lower: -105479909,
              upper: 11719991,
            },
            timebarUuid: 'tb1',
          },
        },
        {
          type: 'HSC_PLAY',
          payload: {
            timebarUuid: 'tb1',
          },
        },
      ]);
    });
    test('sets real time mode, reset speed to 1, reset mode to Normal and update cursors + smartPlay', () => {
      store.dispatch(actions.switchToRealtimeMode('tb4', 1));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_SPEED_UPDATE',
          payload: {
            timebarUuid: 'tb4',
            speed: 1,
          },
        },
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb4',
            mode: 'Normal',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: {
              lower: -89,
              upper: 11,
              current: 1,
            },
            slideWindow: {
              lower: -89,
              upper: 11,
            },
            timebarUuid: 'tb4',
          },
        },
        {
          type: 'HSC_PLAY',
          payload: {
            timebarUuid: 'tb4',
          },
        },
      ]);
    });
  });
  describe('switchToExtensibleMode', () => {
    test('updates mode to Extensible', () => {
      store.dispatch(actions.switchToExtensibleMode('tb4'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb4',
            mode: 'Extensible',
          },
        },
      ]);
    });
    test('updates mode and disable real time', () => {
      store.dispatch(actions.switchToExtensibleMode('tb6'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb6',
            mode: 'Extensible',
          },
        },
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: {
            timebarUuid: 'tb6',
            flag: false,
          },
        },
      ]);
    });
    test('updates mode and update cursors', () => {
      store.dispatch(actions.switchToExtensibleMode('tb5'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb5',
            mode: 'Extensible',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: null,
            slideWindow: {
              lower: 100,
              upper: 200,
            },
            timebarUuid: 'tb5',
          },
        },
      ]);
    });
    test('updates mode, disable real time and update cursors', () => {
      store.dispatch(actions.switchToExtensibleMode('tb1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb1',
            mode: 'Extensible',
          },
        },
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: {
            timebarUuid: 'tb1',
            flag: false,
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: null,
            slideWindow: {
              lower: 100,
              upper: 117200000,
            },
            timebarUuid: 'tb1',
          },
        },
      ]);
    });
  });
  describe('switchToFixedMode', () => {
    test('updates mode', () => {
      store.dispatch(actions.switchToFixedMode('tb3'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb3',
            mode: 'Fixed',
          },
        },
      ]);
    });
    test('updates mode and update cursors', () => {
      store.dispatch(actions.switchToFixedMode('tb4'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb4',
            mode: 'Fixed',
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: null,
            slideWindow: {
              lower: 100,
              upper: 175,
            },
            timebarUuid: 'tb4',
          },
        },
      ]);
    });
    test('updates mode and disable real time', () => {
      store.dispatch(actions.switchToFixedMode('tb1'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb1',
            mode: 'Fixed',
          },
        },
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: {
            timebarUuid: 'tb1',
            flag: false,
          },
        },
      ]);
    });
    test('updates mode, disable real time and update cursors', () => {
      store.dispatch(actions.switchToFixedMode('tb6'));
      expect(store.getActions()).toEqual([
        {
          type: 'WS_TIMEBAR_MODE_UPDATE',
          payload: {
            timebarUuid: 'tb6',
            mode: 'Fixed',
          },
        },
        {
          type: 'WS_TIMEBAR_SET_REALTIME',
          payload: {
            timebarUuid: 'tb6',
            flag: false,
          },
        },
        {
          type: 'WS_TIMEBAR_UPDATE_CURSORS',
          payload: {
            visuWindow: null,
            slideWindow: {
              lower: 100,
              upper: 175,
            },
            timebarUuid: 'tb6',
          },
        },
      ]);
    });
  });
  describe('createNewTimebar', () => {
    test('dispatch a WS_TIMEBAR_CREATE_NEW action', () => {
      store.dispatch(actions.createNewTimebar('newtb1'));
      expect(store.getActions()).toHaveLength(1);
      const action = store.getActions()[0];
      expect(action.type).toBe('WS_TIMEBAR_CREATE_NEW');
      expect(action.payload.timebarId).toBe('newtb1');
      expect(action.payload.timebarUuid).toBeAnUuid();
    });
  });
});
