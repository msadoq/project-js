import _getOr from 'lodash/fp/getOr';
import _set from 'lodash/fp/set';
import { REDUX_SYNCHRONIZATION_PATCH_KEY, TIMING_DATA, TIMING_MILESTONES } from '../../constants';

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
    const patch = _getOr([], ['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], patchAction);
    if (patch.length) {
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
      patchAction = _set(['meta', TIMING_DATA, `${TIMING_MILESTONES.SEND_UP}${identity}`], process.hrtime(), patchAction);
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
