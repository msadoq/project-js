import _set from 'lodash/fp/set';
import { compare } from 'fast-json-patch';
import {
  REDUX_SYNCHRONIZATION_PATCH_KEY,
  TIMING_DATA,
  TIMING_MILESTONES,
} from 'constants';

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
export default function makeMasterDispatcher(
  originalDispatch, getState, sendDown, identity, log, isDebugOn) {
  let nbDispatch = 0;
  return function masterDispatcher(action) {
    nbDispatch += 1;
    if (log) {
      log.silly('Master action dispatched : ', action.type);
    }
    const prevState = getState();
    const timingBegin = process.hrtime();
    originalDispatch(action);
    const timingEnd = process.hrtime();
    const newState = getState();

    let patchAction = action;
    patchAction = _set(['meta', 'origin'], identity, patchAction);
    if (isDebugOn) {
      patchAction = _set(['meta', TIMING_DATA, TIMING_MILESTONES.BEFORE_SERVER_STORE_UPDATE], timingBegin, patchAction);
      patchAction = _set(['meta', TIMING_DATA, TIMING_MILESTONES.AFTER_SERVER_STORE_UPDATE], timingEnd, patchAction);
    }
    if (nbDispatch === 1) {
      const patch = compare(prevState, newState);
      patchAction = _set(['meta', REDUX_SYNCHRONIZATION_PATCH_KEY], patch, patchAction);
    }
    if (log) {
      log.silly('patch forwarded to main process', action.type);
    }
    sendDown(patchAction);
    nbDispatch -= 1;
    return action;
  };
}
