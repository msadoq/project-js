// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : DM : #6700 : 19/06/2017 : Refactor "patch action" decoration (patch in .meta)
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing info to meta action's
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add timing decorator on DEBUG only (for each process) - Move decorator on makeSlave/MasterDispatcher
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Fix failed unit test && fix decorated meta for timing on debug enabled
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Do not filter action with no patch in master dispatcher
// END-HISTORY
// ====================================================================

import _get from 'lodash/fp/get';
import _set from 'lodash/fp/set';
import { REDUX_SYNCHRONIZATION_PATCH_KEY, TIMING_DATA, TIMING_MILESTONES } from 'constants';

/**
 * Returns a slave dispatcher function for main and renderer processes that:
 * - intercepts and dispatch with originalDispatch the "patch" actions
 * - intercepts and forward with sendUp the "regular" actions
 *
 * @param originalDispatch
 * @param sendUp
 * @param identity
 * @param log
 * @returns {slaveDispatcher}
 */
export default function makeSlaveDispatcher(originalDispatch, sendUp, identity, log, isDebugOn) {
  return function slaveDispatcher(action) {
    let patchAction = action;
    const patch = _get(['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], patchAction);
    if (patch) {
      // it's a patch action from server, call patchReducer with original dispatch
      const timingBegin = process.hrtime();
      originalDispatch(patchAction);
      const timingEnd = process.hrtime();
      if (isDebugOn) {
        patchAction = _set(['meta', TIMING_DATA, `${TIMING_MILESTONES.BEFORE_STORE_UPDATE}${identity}`], timingBegin, patchAction);
        patchAction = _set(['meta', TIMING_DATA, `${TIMING_MILESTONES.AFTER_STORE_UPDATE}${identity}`], timingEnd, patchAction);
      }
      if (log) {
        log.silly('Slave patch action dispatched', action.type);
      }
    } else {
      // it's a regular action dispatched in this process, forward to server process
      patchAction = _set(['meta', 'origin'], identity, action);
      if (isDebugOn) {
        patchAction = _set(['meta', TIMING_DATA, `${TIMING_MILESTONES.SEND_UP}${identity}`], process.hrtime(), patchAction);
      }
      sendUp(
        // decorate action with process identity
        patchAction
      );
      if (log) {
        log.silly('action forwarded', action.type);
      }
    }

    return patchAction;
  };
}
