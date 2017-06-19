import _set from 'lodash/fp/set';
import { compare } from 'fast-json-patch';
import {
  REDUX_SYNCHRONIZATION_PATCH_KEY,
  REDUX_SYNCHRONIZATION_PATCH_META,
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
      log.silly('action dispatched', action.type);
    }

    const prevState = getState();
    originalDispatch(action);
    const newState = getState();

    const patch = compare(prevState, newState);
    if (patch.length) {
      // patched action is the original action decorated with an additional key containing patch
      let patchAction = action;
      patchAction = _set(['meta', 'origin'], identity, patchAction);
      patchAction = _set(['meta', REDUX_SYNCHRONIZATION_PATCH_META], true, patchAction);
      patchAction = _set([REDUX_SYNCHRONIZATION_PATCH_KEY], patch, patchAction);
      sendDown(patchAction);
      if (log) {
        log.silly('patch forwarded to main process', action.type);
      }
    }

    return action;
  };
}
