import { getStore } from '../../store';

/**
 * Dispatch "patch" action to store (will be intercepted by renderer store enhancer)
 *
 * @param action
 */
export default function onReduxPatch(action) {
  getStore().dispatch(action);
}
