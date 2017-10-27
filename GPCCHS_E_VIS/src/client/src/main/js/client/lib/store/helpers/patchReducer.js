import _getOr from 'lodash/fp/getOr';
import applyPatch from 'json-touch-patch';
import { REDUX_SYNCHRONIZATION_PATCH_KEY } from '../../constants';
import getLogger from '../../common/logManager';

const logger = getLogger('common:patchReducer');
/**
 * A proxy reducer for main and renderer processes store that handle "patch" actions by applying
 * patch to state with the help of json-touch-patch module.
 *
 * @param state
 * @param action
 * @returns {*}
 */
// let count = 0;
export default function patchReducer(state, action) {
  if (!action) {
    return state;
  }
  const patch = _getOr([], ['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], action);
  if (patch.length) {
    try {
      const statePatched = applyPatch(state, patch, { strict: true });
      return statePatched;
    } catch (e) {
      logger.error(e);
      return state;
    }
  }

  return state;
}
