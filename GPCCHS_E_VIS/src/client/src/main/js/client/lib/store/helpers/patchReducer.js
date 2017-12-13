// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : . . . . .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : split of viewData cleaning in dataReducer for plot
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update patch reducer and makeMasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add redux and patch workflow improvment + remove store observer
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : Add throttle mechanism in patch reducer
// END-HISTORY
// ====================================================================

import _getOr from 'lodash/fp/getOr';
import applyPatch from 'json-touch-patch';
import { REDUX_SYNCHRONIZATION_PATCH_KEY } from 'constants';
import getLogger from 'common/logManager';

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
