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
