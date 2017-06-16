import { UNKNOWN_SESSION_ID } from '../../constants';
import * as actions from './masterSession';
import { mockStore } from '../../common/jest';

describe('store:actions:masterSession', () => {
  describe('updateMasterSessionIfNeeded', () => {
    test('does nothing with unknown session id', () => {
      const store = mockStore();
      store.dispatch(actions.updateMasterSessionIfNeeded(UNKNOWN_SESSION_ID));
      expect(store.getActions()).toEqual([]);
    });
    test('updates master session', () => {
      const store = mockStore();
      store.dispatch(actions.updateMasterSessionIfNeeded('masterSessionOid'));
      expect(store.getActions()).toEqual([
        {
          type: 'HSS_UPDATE_MASTER_SESSION',
          payload: { masterSessionOid: 'masterSessionOid' },
        },
      ]);
    });
  });
});
