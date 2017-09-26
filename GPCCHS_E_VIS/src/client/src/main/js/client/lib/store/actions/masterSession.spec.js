// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Write masterSession action creators tests
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Refacto masterSession action creators tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix jest tests in store/actions
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js in jest/index.js
// END-HISTORY
// ====================================================================

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
