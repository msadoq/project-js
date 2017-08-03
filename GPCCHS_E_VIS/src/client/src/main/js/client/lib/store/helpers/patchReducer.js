import _getOr from 'lodash/fp/getOr';
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

  const patch = _getOr([], ['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], action);
  if (patch.length) {
    let patched = state;
    try {
      patched = applyPatch(state, patch, { strict: true });
    } catch (e) {
      console.log(e);
    }
    return patched;
  }

  return state;
}
