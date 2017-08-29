import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import u from 'updeep';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';

import window from './window';
import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */
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
    case types.WS_WORKSPACE_OPENED: {
      return loadWindows(stateWindows, action);
    }
    case types.WS_PAGE_UPDATE_ABSOLUTEPATH: {
      const windowId = _.findKey(
        w => _.findIndex(i => i === action.payload.pageId, w.pages) !== -1,
        stateWindows
      );
      return _.set(windowId, window(stateWindows[windowId], action), stateWindows);
    }
    case types.WS_TIMELINE_CREATE_NEW:
    case types.WS_TIMELINE_REMOVE:
    case types.WS_PAGE_TIMEBAR_MOUNT:
    case types.WS_PAGE_TIMEBAR_UNMOUNT: {
      return _.mapValues(_.set('isModified', true), stateWindows);
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

/* --- Selectors ------------------------------------------------------------ */
export const getWindows = state => _.getOr({}, 'windows', state);

export const getWindowIds = createSelector(
  getWindows,
  _.keys
);

export const getWindowsArray = createSelector(
  getWindows,
  _.values
);

export const getWindow = createSelector(
  (state, { windowId }) => windowId,
  getWindows,
  _.get
);

export const getWindowTitle = createSelector(
  getWindow,
  _.get('title')
);

export const getWindowPageIds = createSelector(
  getWindow,
  _.get('pages')
);

export const getWindowFocusedPageId = createSelector(
  getWindow,
  _.get('focusedPage')
);

export function getDisplayHelp(state, { windowId }) {
  return _.get(['windows', windowId, 'displayHelp'], state);
}

export const getWindowIdByPageId = createSelector(
  getWindows,
  (state, { pageId }) => pageId,
  (wins, pageId) => _findKey(wins, win => _find(win.pages, page => page === pageId))
);
