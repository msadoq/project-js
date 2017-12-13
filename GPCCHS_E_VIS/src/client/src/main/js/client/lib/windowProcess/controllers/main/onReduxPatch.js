// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// VERSION : 1.1.2 : FA : #7813 : 19/09/2017 : Add batch action + logger support Remove ipc transmission for un-patch action
// END-HISTORY
// ====================================================================

import { getStore } from 'windowProcess/store';
import { BATCH } from 'store/types';
import { REDUX_SYNCHRONIZATION_PATCH_KEY } from 'constants';

/**
 * Dispatch "patch" action to store (will be intercepted by renderer store enhancer)
 *
 * @param action
 */
export default function onReduxPatch(actionQueue) {
  const { queue } = actionQueue;
  if (queue.length !== 0) {
    getStore().dispatch({
      type: BATCH,
      meta: {
        batch: true,
        [REDUX_SYNCHRONIZATION_PATCH_KEY]: REDUX_SYNCHRONIZATION_PATCH_KEY,
      },
      payload: queue,
    });
  }
}
