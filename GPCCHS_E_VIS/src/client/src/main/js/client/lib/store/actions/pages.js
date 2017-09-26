// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 15/02/2017 : Rename payload.focusedPageId in payload.pageId in actions/pages and reducers/pages
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Remove actions/enhancers/index.js . . .
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : Change ifPathChanged action creator enhancer arguments
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : remove useless configuration property from payload in WS_PAPGE_EDITOR_OPEN action
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Remove useless thunk updateTimebarId in actions/pages
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Remove french comment in actions/pages
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Page add default timebar assignation.
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refacto menuManager/viewOpen . . .
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 10/03/2017 : store collapsed & maximized bool in page layout
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Simplify rootReducer, transforming closePage in a thunk
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup redux actions . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_VIEW_ADD by WS_VIEW_ADD_BLANK .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Refacto loadDocumentsInStore from documentManager .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : FIlter unused values in page state
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_CLOSE action + remove unmountAndRemove (page)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add readView + loadDocumentsInStore in documentManager
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels configuration storage in page
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getFirstTimebarId simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Draft the resizable panels and cleanup components props (views not functionnal)
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Fix open editor when entrypoint is dropped
// VERSION : 1.1.2 : DM : #5828 : 31/03/2017 : Add getWindowTitle selector + replace all "getState().x"
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for editor
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Fix bug in actions/pages#openEditor thunk
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Change askOpenPage redux action signature
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rename WS_ASK_PAGE in WS_ASK_OPEN_PAGE action
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add askPage redux action .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { v4 } from 'uuid';
import simple from '../helpers/simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { getFirstTimebarId } from '../reducers/timebars';
import { getFocusedWindowId } from '../reducers/hsc';
import { getPanels } from '../reducers/pages';
import { getWindowIdByPageId } from '../reducers/windows';
import { focusPage as focusPageInWindow } from '../actions/windows';

/**
 * Simple actions
 */
export const updateLayout = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');
export const setPageOid = simple(types.WS_PAGE_SET_OID, 'pageId', 'oid');
export const setCollapsed = simple(types.WS_VIEW_SETCOLLAPSED, 'pageId', 'viewId', 'flag');
export const setMaximized = simple(types.WS_VIEW_SETMAXIMISED, 'pageId', 'viewId', 'flag');

/* Update path/absolutePath */
export const updatePath = ifPathChanged(
  simple(types.WS_PAGE_UPDATEPATH, 'pageId', 'newPath'),
  'pages', 'path', 'pageId'
);
export const updateAbsolutePath = ifPathChanged(
  simple(types.WS_PAGE_UPDATE_ABSOLUTEPATH, 'pageId', 'newPath'),
  'pages', 'absolutePath', 'pageId');
/* ------------------------ */

export const setModified = simple(types.WS_PAGE_SETMODIFIED, 'pageId', 'flag');
export const mountPageTimebar = simple(types.WS_PAGE_TIMEBAR_MOUNT, 'pageId', 'timebarUuid');
export const unmountPageTimebar = simple(types.WS_PAGE_TIMEBAR_UNMOUNT, 'pageId');
export const updateTitle = simple(types.WS_PAGE_UPDATE_TITLE, 'pageId', 'title');

export const loadInEditor = simple(types.WS_PAGE_PANELS_LOAD_IN_EDITOR, 'pageId', 'viewId');
export const resizeEditor = simple(types.WS_PAGE_PANELS_RESIZE_EDITOR, 'pageId', 'size');
export const minimizeEditor = simple(types.WS_PAGE_PANELS_MINIMIZE_EDITOR, 'pageId', 'isMinimized');
export const resizeTimebar = simple(types.WS_PAGE_PANELS_RESIZE_TIMEBAR, 'pageId', 'size');
export const minimizeTimebar = simple(types.WS_PAGE_PANELS_MINIMIZE_TIMEBAR, 'pageId', 'isMinimized');
export const focusTabInExplorer = simple(types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER, 'pageId', 'focusedTab');
export const resizeExplorer = simple(types.WS_PAGE_PANELS_RESIZE_EXPLORER, 'pageId', 'size');
export const minimizeExplorer = simple(types.WS_PAGE_PANELS_MINIMIZE_EXPLORER, 'pageId', 'isMinimized');
const moveView = simple(types.WS_VIEW_MOVE_TO_PAGE, 'fromPageId', 'toPageId', 'viewId');

export const updateDomainName = simple(types.WS_PAGE_UPDATE_DOMAINNAME, 'pageId', 'domainName');
export const updateSessionName = simple(types.WS_PAGE_UPDATE_SESSIONNAME, 'pageId', 'sessionName');
/**
 * Compound actions
 */

export const addBlankPage = (windowId, newPageId = v4()) => (dispatch, getState) => {
  const state = getState();
  const wId = windowId || getFocusedWindowId(state);
  return dispatch({
    type: types.WS_PAGE_ADD_BLANK,
    payload: {
      windowId: wId,
      page: {
        uuid: newPageId,
        timebarUuid: getFirstTimebarId(state),
      },
    },
  });
};

export const askOpenPage = simple(types.WS_ASK_OPEN_PAGE, 'windowId', 'absolutePath');
export const askSavePage = simple(types.WS_ASK_SAVE_PAGE, 'pageId', 'saveAs');
export const askClosePage = simple(types.WS_ASK_CLOSE_PAGE, 'pageId');

export const closePage = pageId => (dispatch, getState) => {
  const state = getState();
  const viewIds = _.get(['pages', pageId, 'views'], state);
  const windowId = getWindowIdByPageId(state, { pageId });
  dispatch({
    type: types.WS_PAGE_CLOSE,
    payload: { windowId, pageId, viewIds },
  });
};

export function moveViewToPage(windowId, fromPageId, toPageId, viewId) {
  return (dispatch) => {
    if (!toPageId) {
      const newPageId = v4();
      dispatch(addBlankPage(windowId, newPageId));
      dispatch(moveView(fromPageId, newPageId, viewId));
    } else {
      dispatch(moveView(fromPageId, toPageId, viewId));
    }
  };
}

export function openEditor(pageId, viewId) { // TODO boxmodel test
  return (dispatch, getState) => {
    dispatch(minimizeEditor(pageId, false));
    const { editorWidth } = getPanels(getState(), { pageId });
    if (!editorWidth || editorWidth < 1) {
      dispatch(resizeEditor(pageId, 350));
    }

    dispatch(loadInEditor(pageId, viewId));
  };
}

export function focusPage(pageId) {
  return (dispatch, getState) => {
    // get window containing the pageId
    const winId = getWindowIdByPageId(getState(), { pageId });
    if (!winId) {
      return;
    }
    dispatch(focusPageInWindow(winId, pageId));
  };
}
