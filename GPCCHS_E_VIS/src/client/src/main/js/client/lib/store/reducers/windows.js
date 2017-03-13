import _ from 'lodash/fp';
import u from 'updeep';

import window from './windows/window';
import * as types from '../types';

const loadWindows = (stateWindows, action) => {
  const setPayloadWindow = _.set('payload.window');
  const singleWindowReducer = stateWindow => (
    window(undefined, setPayloadWindow(stateWindow, action))
  );
  return _.compose(
    _.defaults(stateWindows),          // 3. merge with old stateWindows
    _.indexBy('uuid'),                 // 2. index windows array by uuid
    _.map(singleWindowReducer)         // 1. apply single window reducer on all windows
  )(action.payload.windows);
};

export default function windows(stateWindows = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_WINDOW_ADD:
      return _.set(action.payload.windowId, window(undefined, action), stateWindows);
    case types.WS_WINDOW_CLOSE:
      return _.omit(action.payload.windowId, stateWindows);
    case types.WS_WORKSPACE_OPEN: {
      return loadWindows(stateWindows, action);
    }
    default: {
      if (
        action.payload &&
        action.payload.windowId &&
        stateWindows[action.payload.windowId]
      ) {
        const currentWindow = stateWindows[action.payload.windowId];
        return u({
          [action.payload.windowId]: window(currentWindow, action),
        }, stateWindows);
      }
      return stateWindows;
    }
  }
}
