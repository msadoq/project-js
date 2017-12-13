import { mockStore, freezeMe } from 'common/jest';
/* eslint-disable no-unused-expressions */
import * as types from '../types';
import * as actions from './health';

describe('store:actions:health', () => {
  const store = mockStore(freezeMe({
    health: {
      dcStatus: false,
      hssStatus: false,
      lastPubSubTimestamp: 0,
    },
  }));

  afterEach(() => {
    store.clearActions();
  });

  describe('updateHealth', () => {
    test('does update hss status', () => {
      const status = 'status';
      store.dispatch(actions.updateHssStatus(status));

      expect(store.getActions()).toEqual([
        {
          type: types.HSS_UPDATE_HEALTH_STATUS,
          payload: {
            status: 'status',
          },
        },
      ]);
    });

    test('does update window status', () => {
      const status = 'status';
      const windowId = 'wid';
      store.dispatch(actions.updateWindowStatus(windowId, status));

      expect(store.getActions()).toEqual([
        {
          type: types.HSS_UPDATE_WINDOW_STATUS,
          payload: {
            status: 'status',
            windowId,
          },
        },
      ]);
    });

    test('does update main status', () => {
      const status = 'status';
      store.dispatch(actions.updateMainStatus(status));

      expect(store.getActions()).toEqual([
        {
          type: types.HSS_UPDATE_MAIN_STATUS,
          payload: {
            status: 'status',
          },
        },
      ]);
    });

    test('does update stress for a given process', () => {
      const isStressed = true;
      const myProcess = 'myProcess';

      store.dispatch(actions.updateStressProcess(myProcess, isStressed));

      expect(store.getActions()).toEqual([
        {
          type: types.HSC_UPDATE_STRESS,
          payload: {
            isStressed: true,
            process: myProcess,
          },
        },
      ]);
    });
    // pgaucher => Is this update still necessary

    /* test('does update lastPubSubTimestamp status', () => {
      const status = { dcStatus: false, hssStatus: false, lastPubSubTimestamp: 42 };
      store.dispatch(actions.updateHealth(status, 0));
      expect(store.getActions()).toEqual([
        { type: 'HSS_UPDATE_LAST_PUBSUB_TIMESTAMP', payload: { timestamp: 42 } },
      ]);
    });

    test('throttles updateLastPubSubTimestamp', (done) => {
      const status = { dcStatus: false, hssStatus: false, lastPubSubTimestamp: 42 };
      store.dispatch(actions.updateHealth(status, 5));
      store.dispatch(actions.updateHealth(status, 5));
      expect(store.getActions()).toHaveLength(1);
      setTimeout(done, 10);
    }); */
  });
});
