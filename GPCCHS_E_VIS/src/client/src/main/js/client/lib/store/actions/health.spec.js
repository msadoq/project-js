/* eslint-disable no-unused-expressions */
import * as types from '../types';
import * as actions from './health';
import { mockStore, freezeMe } from '../../common/test';

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
    it('does nothing when no status has changed', () => {
      store.dispatch(actions.updateHealth(store.getState().health));
      expect(store.getActions).toHaveLength(0);
    });

    it('does update all status', () => {
      const status = { dcStatus: true, hssStatus: true, lastPubSubTimestamp: 42 };
      store.dispatch(actions.updateHealth(status, 0));
      expect(store.getActions()).toEqual([
        { type: 'HSS_UPDATE_DC_STATUS', payload: { status: true } },
        { type: 'HSS_UPDATE_HEALTH_STATUS', payload: { status: true } },
        { type: 'HSS_UPDATE_LAST_PUBSUB_TIMESTAMP', payload: { timestamp: 42 } },
      ]);
    });

    it('does update dc status', () => {
      const status = { dcStatus: true, hssStatus: false, lastPubSubTimestamp: 0 };
      store.dispatch(actions.updateHealth(status, 0));
      expect(store.getActions()).toEqual([
        { type: 'HSS_UPDATE_DC_STATUS', payload: { status: true } },
      ]);
    });

    it('does update hss status', () => {
      const status = { dcStatus: false, hssStatus: true, lastPubSubTimestamp: 0 };
      store.dispatch(actions.updateHealth(status, 0));

      expect(store.getActions()).toEqual([
        {
          type: types.HSS_UPDATE_HEALTH_STATUS,
          payload: {
            status: true,
          },
        },
      ]);
    });

    it('does update lastPubSubTimestamp status', () => {
      const status = { dcStatus: false, hssStatus: false, lastPubSubTimestamp: 42 };
      store.dispatch(actions.updateHealth(status, 0));
      expect(store.getActions()).toEqual([
        { type: 'HSS_UPDATE_LAST_PUBSUB_TIMESTAMP', payload: { timestamp: 42 } },
      ]);
    });

    it('throttles updateLastPubSubTimestamp', (done) => {
      const status = { dcStatus: false, hssStatus: false, lastPubSubTimestamp: 42 };
      store.dispatch(actions.updateHealth(status, 5));
      store.dispatch(actions.updateHealth(status, 5));
      expect(store.getActions()).toHaveLength(1);
      setTimeout(done, 10);
    });
  });
});
