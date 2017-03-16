import _ from 'lodash/fp';
import { v4 } from 'uuid';
import simple from '../simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { getFirstTimebarId } from '../selectors/timebars';
import { getFocusedWindowId } from '../selectors/hsc';

/**
 * Simple actions
 */
export const openEditor = simple(types.WS_PAGE_EDITOR_OPEN,
  'pageId', 'viewId', 'viewType');
export const closeEditor = simple(types.WS_PAGE_EDITOR_CLOSE, 'pageId');
export const updateLayout = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');
export const collapseTimebar = simple(types.WS_PAGE_TIMEBAR_COLLAPSE, 'pageId', 'flag'); // TODO boxmodel remove
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
export const updateTimebarHeight = simple(types.WS_PAGE_UPDATE_TIMEBARHEIGHT, 'pageId', 'timebarHeight'); // TODO boxmodel remove
export const updateTimebarId = simple(types.WS_PAGE_UPDATE_TIMEBARID, 'pageId', 'timebarUuid');

export const loadInEditor = simple(types.WS_PAGE_PANELS_LOAD_IN_EDITOR, 'pageId', 'viewId');
export const resizeEditor = simple(types.WS_PAGE_PANELS_RESIZE_EDITOR, 'pageId', 'size');
export const resizeTimebar = simple(types.WS_PAGE_PANELS_RESIZE_TIMEBAR, 'pageId', 'size');
export const focusTabInExplorer = simple(types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER, 'pageId', 'focusedTab');
export const resizeExplorer = simple(types.WS_PAGE_PANELS_RESIZE_EXPLORER, 'pageId', 'size');

const moveView = simple(types.WS_VIEW_MOVE_TO_PAGE, 'fromPageId', 'toPageId', 'viewId');

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

export const closePage = (windowId, pageId) => (dispatch, getState) => {
  const viewIds = _.get(['pages', pageId, 'views'], getState());
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
