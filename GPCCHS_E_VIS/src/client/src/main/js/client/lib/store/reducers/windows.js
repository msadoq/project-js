import _ from 'lodash/fp';
import u from 'updeep';

import window from './windows/window';
import * as types from '../types';

export default function windows(stateWindows = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_WINDOW_ADD:
      return _.set(action.payload.windowId, window(undefined, action), stateWindows);
    case types.WS_WINDOW_CLOSE:
      return _.omit(action.payload.windowId, stateWindows);
    case types.WS_LOAD_DOCUMENTS: {
      const { documents } = action.payload;
      const setPayloadWindow = _.set('payload.window');
      if (_.isEmpty(documents.windows) && !_.isEmpty(documents.pages)) {
        return _.mapValues(p => window(p, action), stateWindows); // WS_PAGE_LOAD
      }
      const singleWindowReducer = stateWindow => (
        window(undefined, setPayloadWindow(stateWindow, action))
      );
      return _.compose(
        _.defaults(stateWindows),          // 3. merge with old stateWindows
        _.indexBy('uuid'),                 // 2. index windows array by uuid
        _.map(singleWindowReducer)         // 1. apply single window reducer on all windows
      )(documents.windows);
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
