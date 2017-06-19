import _set from 'lodash/fp/set';
import { REDUX_SYNCHRONIZATION_PATCH_KEY } from '../../constants';

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
export default function makeSlaveDispatcher(originalDispatch, sendUp, identity, log) {
  return function slaveDispatcher(action) {
    if (Array.isArray(action[REDUX_SYNCHRONIZATION_PATCH_KEY])) {
      // it's a patch action from server, call patchReducer with original dispatch
      originalDispatch(action);
      if (log) {
        log.silly('patch action dispatched', action.type);
      }
    } else {
      // it's a regular action dispatched in this process, forward to server process
      sendUp(
        // decorate action with process identity
        _set(['meta', 'origin'], identity, action)
      );
      if (log) {
        log.silly('action forwarded', action.type);
      }
    }

    return action;
  };
}
