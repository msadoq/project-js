import __ from 'lodash/fp';
import u from 'updeep';

import window from './windows/window';
import * as types from '../types';

export default function windows(stateWindows = {}, action) {
  const { payload = {} } = action;
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_WINDOW_ADD:
      return __.set(payload.windowId, window(undefined, action), stateWindows);
    case types.WS_WINDOW_REMOVE:
      return __.omit(payload.windowId, stateWindows);
    default: {
      if (!payload.windowId || !stateWindows[payload.windowId]) {
        return stateWindows;
      }
      const currentTimebar = stateWindows[payload.windowId];
      return u({
        [payload.windowId]: window(currentTimebar, action),
      }, stateWindows);
    }
  }
}
