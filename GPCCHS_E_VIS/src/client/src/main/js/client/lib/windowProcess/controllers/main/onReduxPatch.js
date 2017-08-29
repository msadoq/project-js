import { getStore } from '../../store';

/**
 * Dispatch "patch" action to store (will be intercepted by renderer store enhancer)
 *
 * @param action
 */
export default function onReduxPatch(actionQueue) {
  const { queue } = actionQueue;
  for (let i = 0; i < queue.length; i += 1) {
    getStore().dispatch(queue[i]);
  }
}
