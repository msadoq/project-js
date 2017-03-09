import { v4 } from 'uuid';
import simple from '../simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { getFirstTimebarId } from '../selectors/timebars';
import { getFocusedWindowId } from '../selectors/hsc';
/**
 * Simple actions
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
        windowId: wId,
      },
    },
  });
};

export const closePage = simple(types.WS_PAGE_CLOSE, 'windowId', 'pageId');
export const removePage = simple(types.WS_PAGE_REMOVE, 'pageId');
export const openEditor = simple(types.WS_PAGE_EDITOR_OPEN,
  'pageId', 'viewId', 'viewType');
export const closeEditor = simple(types.WS_PAGE_EDITOR_CLOSE, 'pageId');
export const updateLayout = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');
export const collapseTimebar = simple(types.WS_PAGE_TIMEBAR_COLLAPSE, 'pageId', 'flag');
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
export const updateTimebarHeight = simple(types.WS_PAGE_UPDATE_TIMEBARHEIGHT, 'pageId', 'timebarHeight');
export const updateTimebarId = simple(types.WS_PAGE_UPDATE_TIMEBARID, 'pageId', 'timebarUuid');

/**
 * Compound actions
 */

const moveView = simple(types.WS_VIEW_MOVE_TO_PAGE, 'fromPageId', 'toPageId', 'viewId');

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
