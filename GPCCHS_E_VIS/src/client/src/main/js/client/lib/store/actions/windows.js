// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Some documentManager fixes . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add readWorkspace in documentManager .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_VIEW_ADD by WS_VIEW_ADD_BLANK .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fix missing properties, timebarHeight and
//  timebarCollapsed in addAndMountPage
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename WS_WINDOW_REMOVE in WS_WINDOW_CLOSE .
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data
//  requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Add displayHelp key in window reducer to store help
//  screen state in store
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use
//  panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Transform closeWindow simple action creator in a
//  thunk
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu
//  Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Player middleware now pause when focus a page with
//  another timebar
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard
//  (documents middleware)
// VERSION : 2.0.0 : FA : #9380 : 23/11/2017 : Docking d'une page dans une nouvelle fenetre
// VERSION : 2.0.0 : FA : #10670 : 09/02/2018 : Detach a page no dispatch
// VERSION : 2.0.0 : FA : #10670 : 12/02/2018 : Detach a page and attach window with tests
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { v4 } from 'uuid';
import simple from '../helpers/simpleActionCreator';
import * as types from '../types';
import { getPage } from '../reducers/pages';
import { getWindowPages } from '../selectors/windows';
import { getWindowPageIds, getWindowFocusedPageId } from '../reducers/windows';


/**
 * Simple actions
 */
export const addWindow = simple(types.WS_WINDOW_ADD, 'windowId', 'title', 'geometry', 'pages', 'focusedPage');

export const askCloseWindow = simple(types.WS_ASK_CLOSE_WINDOW, 'windowId');
const pageMoveToWindow = simple(types.WS_PAGE_MOVE_TO_WINDOW, 'fromWindowId', 'toWindowId', 'pageId');

export const closeWindow = simple(types.WS_WINDOW_CLOSE, 'windowId');

// export const closeWindow = simple(types.WS_WINDOW_CLOSE, 'windowId');
export const setIsLoaded = simple(types.WS_WINDOW_SET_IS_LOADED, 'windowId');

export const reorderPages = simple(types.WS_WINDOW_PAGE_REORDER, 'windowId', 'pages');
export const updateGeometry = simple(types.WS_WINDOW_UPDATE_GEOMETRY,
  'windowId', 'x', 'y', 'w', 'h'
);
export const minimize = simple(types.WS_WINDOW_MINIMIZE, 'windowId');
export const restore = simple(types.WS_WINDOW_RESTORE, 'windowId');
export const updateTitle = simple(types.WS_WINDOW_UPDATE_TITLE, 'windowId', 'title');

export const displayHelp = simple(types.WS_WINDOW_SET_DISPLAY_HELP, 'windowId', 'display');

export const moveTabOrder =
  simple(types.WS_WINDOW_MOVE_TAB_ORDER, 'windowId', 'keyFrom', 'keyTarget');

/**
 * Compound actions
 */

export function focusPage(windowId, pageId) {
  return (dispatch, getState) => {
    const state = getState();

    const getFirstPage = _.compose(_.get('[0]'), getWindowPages);
    const focusedPage = getPage(state, { pageId }) || getFirstPage(state, { windowId });
    if (!focusedPage) {
      return;
    }

    dispatch({
      type: types.WS_WINDOW_PAGE_FOCUS,
      payload: {
        windowId,
        pageId: focusedPage.pageId,
      },
    });
  };
}

/**
 * @param detachWindow
 * @param windowId
 * @returns {function(*, *)}
 */
export function pageDragEvent(detachWindow, windowId) {
  return (dispatch, getState) => {
    const state = getState();
    let attachWindow;
    if (!state.attachWindow) {
      attachWindow = windowId;
    }
    if (state.detachWindow !== detachWindow) {
      dispatch({
        type: types.PAGE_DRAG_EVENT,
        payload: {
          detachWindow,
          attachWindow,
        },
      });
    }
  };
}

/**
 * @param pageId
 * @param fromWindowId
 * @param toWindowId
 * @returns {function(*)}
 */
export function movePageToWindow(pageId, fromWindowId, toWindowId) {
  return (dispatch, getState) => {
    const state = getState();
    const nbPages = getWindowPageIds(state, { windowId: fromWindowId }).length;
    let windowId = toWindowId;
    // we create a window only if there is more than one page in the fromWindow
    if (!toWindowId && nbPages > 1) {
      const newWindowId = v4();
      dispatch(addWindow(newWindowId, 'new Window'));
      windowId = newWindowId;
    }
    // windowId is not defined if there isn't more than one page in the fromWindow
    // In this case there is nothing to do
    if (windowId) {
      // move selected page to selected or new window
      dispatch(pageMoveToWindow(fromWindowId, windowId, pageId));
      // In this case there is at least two windows
      // the from window contains only one page
      // we need to close it
      if (nbPages === 1) {
        dispatch(closeWindow(fromWindowId));
      }
      // focus this page on the new window
      dispatch(focusPage(windowId, pageId));
      // if moved view was focused, select another one in the previous window
      const focusedPageId = getWindowFocusedPageId(state, { windowId: fromWindowId });
      if (focusedPageId === pageId) {
        const pageIds = _.difference(getWindowPageIds(state, { windowId: fromWindowId }), [pageId]);
        // at least one page remaining in the previous window
        if (pageIds.length > 0) {
          // focus that page in the previous window
          dispatch(focusPage(fromWindowId, pageIds[0]));
        }
      }
    }
  };
}
