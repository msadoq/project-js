import _set from 'lodash/fp/set';
import { compare } from 'fast-json-patch';
import {
  REDUX_SYNCHRONIZATION_PATCH_KEY,
  TIMING_DATA,
  TIMING_MILESTONES,
} from '../../constants';

/**
 * Returns a master dispatcher function for server process.
 * Dispatcher generates a patch and send to main process for each action.
 *
 * @param originalDispatch
 * @param getState
 * @param sendDown
 * @param identity
 * @param log
 * @returns {masterDispatcher}
 */
export default function makeMasterDispatcher(originalDispatch, getState, sendDown, identity, log) {
  return function masterDispatcher(action) {
    if (log) {
      log.silly('Master action dispatched : ', action.type);
    }
    const prevState = getState();
    const timingBegin = process.hrtime();
    originalDispatch(action);
    const timingEnd = process.hrtime();
    const newState = getState();

    const patch = compare(prevState, newState);
    if (patch.length) {
      // patched action is the original action decorated with an additional key containing patch
      let patchAction = action;
      patchAction = _set(['meta', 'origin'], identity, patchAction);
      patchAction = _set(['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], patch, patchAction);
      patchAction = _set(['meta', TIMING_DATA, TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE], timingBegin, patchAction);
      patchAction = _set(['meta', TIMING_DATA, TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE], timingEnd, patchAction);
      sendDown(patchAction);
      if (log) {
        log.silly('patch forwarded to main process', action.type);
      }
    }

    return action;
  };
}
