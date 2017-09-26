// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : set throttle delay to 10ms in health.spec.js
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Write updateHealth thunk tests .
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : Removal of a test in actions health .
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add middlware to induce stress => not possible - Modify health logic, change as soon as the critical delay is reached
// END-HISTORY
// ====================================================================

/* eslint-disable no-unused-expressions */
import * as types from '../types';
import * as actions from './health';
import { mockStore, freezeMe } from '../../common/jest';

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
