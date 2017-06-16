import applyPatch from 'json-touch-patch';
import { REDUX_SYNCHRONIZATION_PATCH_KEY } from '../../constants';

/**
 * A proxy reducer for main and renderer processes store that handle "patch" actions by applying
 * patch to state with the help of json-touch-patch module.
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function patchReducer(state, action) {
  if (!action) {
    return state;
  }

  const patch = action[REDUX_SYNCHRONIZATION_PATCH_KEY];
  if (Array.isArray(patch)) {
    return applyPatch(state, patch);
  }

  return state;
}
