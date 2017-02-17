import __ from 'lodash/fp';
import u from 'updeep';

import window from './windows/window';
import * as types from '../types';

export default function windows(stateWindows = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_WINDOW_ADD:
      return __.set(action.payload.windowId, window(undefined, action), stateWindows);
    case types.WS_WINDOW_REMOVE:
      return __.omit(action.payload.windowId, stateWindows);
    default: {
      if (
        action.payload &&
        action.payload.windowId &&
        stateWindows[action.payload.windowId]
      ) {
        const currentTimebar = stateWindows[action.payload.windowId];
        return u({
          [action.payload.windowId]: window(currentTimebar, action),
        }, stateWindows);
      }
      return stateWindows;
    }
  }
}
