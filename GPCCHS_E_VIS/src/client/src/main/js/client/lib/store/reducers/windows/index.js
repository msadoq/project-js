// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all windows simple selectors in store/reducers/windows
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : SaveAs at a different path should set workspace isModified
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : set workspace (all windows) is modified when manipulate timebars / timelines
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Add getWindowTitle selector + replace all "getState().x"
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Fix isModified on windows when move visuWindow
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard (documents middleware)
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import u from 'updeep';
import _find from 'lodash/find';
import _findKey from 'lodash/findKey';

import * as types from 'store/types';
import window from './window';

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

/**
 * @param stateWindows
 * @param action
 * @returns {*}
 */
const movePageToWindow = (stateWindows, action) => {
  const { fromWindowId, toWindowId, pageId } = action.payload;
  if (fromWindowId === toWindowId) {
    return stateWindows;
  }

  if (_.indexOf(pageId, _.getOr([], `${fromWindowId}.pages`, stateWindows)) === -1) {
    return stateWindows;
  }

  return _.flow(
    _.set(
      `${fromWindowId}.pages`,
      _.remove(page => page === pageId, stateWindows[fromWindowId].pages)
    ),
    _.set(
      `${toWindowId}.pages`,
      _.concat(
        [pageId],
        _.getOr([], `${toWindowId}.pages`, stateWindows)
      )
    )
  )(stateWindows);
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
    case types.WS_PAGE_MOVE_TO_WINDOW: {
      return movePageToWindow(stateWindows, action);
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
