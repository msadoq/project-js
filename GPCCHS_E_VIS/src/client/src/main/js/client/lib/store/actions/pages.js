import { v4 } from 'uuid';
import simple from '../simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { getFirstTimebarId } from '../selectors/timebars';
import { getFocusedWindowId } from '../selectors/hsc';
import {
  add as addView,
  remove as removeView,
} from './views';
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

export const removePage = simple(types.WS_PAGE_REMOVE, 'pageId');
export const mountView = simple(types.WS_PAGE_VIEW_MOUNT, 'pageId', 'viewId', 'layout');
export const unmountView = simple(types.WS_PAGE_VIEW_UNMOUNT, 'pageId', 'viewId');
export const openEditor = simple(types.WS_PAGE_EDITOR_OPEN,
  'pageId', 'viewId', 'viewType');
export const closeEditor = simple(types.WS_PAGE_EDITOR_CLOSE, 'pageId');
export const updateLayout = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');
export const collapseTimebar = simple(types.WS_PAGE_TIMEBAR_COLLAPSE, 'pageId', 'flag');
export const setPageOid = simple(types.WS_PAGE_SET_OID, 'pageId', 'oid');
export const setCollapsed = simple(types.WS_VIEW_SETCOLLAPSED, 'pageId', 'viewId', 'flag');
export const setMaximized = simple(types.WS_VIEW_SETMAXIMISED, 'pageId', 'viewId', 'flag');

/* Update path/absolutePath */
const simpleUpdatePath = simple(types.WS_PAGE_UPDATEPATH, 'pageId', 'newPath');
const simpleUpdateAbsolutePath = simple(types.WS_PAGE_UPDATE_ABSOLUTEPATH, 'pageId', 'newPath');

export const updatePath = ifPathChanged(simpleUpdatePath, 'pages', 'path', 'pageId');
export const updateAbsolutePath = ifPathChanged(simpleUpdateAbsolutePath, 'pages', 'absolutePath', 'pageId');
/* ------------------------ */

// export const updatePath = simple(types.WS_PAGE_UPDATEPATH, 'pageId', 'newPath');
// export const updateAbsolutePath = simple(types.WS_PAGE_UPDATE_ABSOLUTEPATH, 'pageId', 'newPath');

export const setModified = simple(types.WS_PAGE_SETMODIFIED, 'pageId', 'flag');

export const updateTimebarHeight = simple(types.WS_PAGE_UPDATE_TIMEBARHEIGHT, 'pageId', 'timebarHeight');

export const updateTimebarId = simple(types.WS_PAGE_UPDATE_TIMEBARID, 'pageId', 'timebarUuid');

/**
 * Compound actions
 */
const addViewInLayout = (page, viewId, specificLayout) => {
  const layout = { w: 5, h: 5, x: 0, y: 0, ...specificLayout, i: viewId };
  if (!page) {
    return layout;
  }
  return [...page.layout, layout];
};

export function addAndMount(pageId, viewId, view = {}) {
  return (dispatch, getState) => {
    const page = getState().pages[pageId];
    dispatch(
      addView(viewId, view.type, view.configuration, view.path, view.oId, view.absolutePath)
    );
    dispatch(mountView(pageId, viewId, addViewInLayout(page, viewId, view.geometry)));
  };
}

export function unmountAndRemove(pageId, viewId) {
  return (dispatch) => {
    dispatch(unmountView(pageId, viewId));
    dispatch(removeView(viewId));
  };
}

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

export function remove(pageId) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.pages[pageId]) {
      return;
    }
    const views = state.pages[pageId].views;
    views.forEach((viewId) => {
      dispatch(unmountAndRemove(pageId, viewId));
    });
    dispatch(removePage(pageId));
  };
}
