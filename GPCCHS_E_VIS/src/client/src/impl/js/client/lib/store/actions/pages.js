import { v4 } from 'node-uuid';
import simple from '../simpleActionCreator';
import { ifPathChanged } from './enhancers';
import * as types from '../types';
import { getView } from '../selectors/views';
import {
  add as addView,
  remove as removeView,
  setCollapsed as setCollapsedView,
} from './views';
import { addAndMount as addAndMountPage,
         focusPage,
         setModified as setModifiedWindow } from './windows';
import { getFocusedWindowId } from '../selectors/hsc';
/**
 * Simple actions
 */
export const add = simple(types.WS_PAGE_ADD, 'pageId', 'timebarUuid', 'title', 'views', 'layout',
  'path', 'oId', 'absolutePath', 'isModified', 'properties');
export const removePage = simple(types.WS_PAGE_REMOVE, 'pageId');
export const mountView = simple(types.WS_PAGE_VIEW_MOUNT, 'pageId', 'viewId', 'layout');
export const unmountView = simple(types.WS_PAGE_VIEW_UNMOUNT, 'pageId', 'viewId');
export const openEditor = simple(types.WS_PAGE_EDITOR_OPEN,
  'pageId', 'viewId', 'viewType', 'configuration');
export const closeEditor = simple(types.WS_PAGE_EDITOR_CLOSE, 'pageId');
export const updateLayoutSimple = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');

export const setPageOid = simple(types.WS_PAGE_SET_OID, 'pageId', 'oid');

export const updateLayout = (pageId, layout) =>
  (dispatch, getState) => {
    layout.forEach((l) => {
      if (l.h > 1) {
        const view = getView(getState(), l.i);
        if (view && view.configuration.collapsed) {
          dispatch(setCollapsedView(l.i, false));
        }
      }
    });
    dispatch(updateLayoutSimple(pageId, layout));
  };

/* Update path/absolutePath */
const simpleUpdatePath = simple(types.WS_PAGE_UPDATEPATH, 'pageId', 'newPath');
const simpleUpdateAbsolutePath = simple(types.WS_PAGE_UPDATE_ABSOLUTEPATH, 'pageId', 'newPath');

export const updatePath = ifPathChanged(simpleUpdatePath, ['pages', 'path', 'pageId']);
export const updateAbsolutePath = ifPathChanged(simpleUpdateAbsolutePath, ['pages', 'absolutePath', 'pageId']);
/* ------------------------ */

// export const updatePath = simple(types.WS_PAGE_UPDATEPATH, 'pageId', 'newPath');
// export const updateAbsolutePath = simple(types.WS_PAGE_UPDATE_ABSOLUTEPATH, 'pageId', 'newPath');

export const setModified = simple(types.WS_PAGE_SETMODIFIED, 'pageId', 'flag');

export const updateTimebarHeight = simple(types.WS_PAGE_UPDATE_TIMEBARHEIGHT, 'focusedPageId', 'timebarHeight');

/**
 * Compound actions
 */
export function addAndMount(pageId, viewId = v4(), view, layout) {
  return (dispatch) => {
    if (!view) {
      dispatch(addView(viewId));
    } else {
      dispatch(addView(viewId, view.type, view.configuration, view.path, view.oId,
        view.absolutePath));
    }
    dispatch(mountView(pageId, viewId, layout));
  };
}

export function unmountAndRemove(pageId, viewId) {
  return (dispatch) => {
    dispatch(unmountView(pageId, viewId));
    dispatch(removeView(viewId));
  };
}

export function moveViewToPage(windowId, fromPageId, toPageId, viewId) {
  return (dispatch, getState) => {
    if (fromPageId !== toPageId) {
      // Add page if not existing
      if (!getState().pages[toPageId]) {
        dispatch(addAndMountPage(windowId, toPageId));
      }
      dispatch(unmountView(fromPageId, viewId));
      dispatch(focusPage(windowId, toPageId));
      dispatch(mountView(toPageId, viewId,
        getState().pages[toPageId].layout.concat({ i: viewId, w: 5, h: 5, x: 0, y: 0 })));
    }
  };
}

export function remove(pageId) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.pages[pageId]) {
      return state;
    }
    const views = state.pages[pageId].views; // tableau
    views.forEach((viewId) => {
      dispatch(unmountAndRemove(pageId, viewId));
    });
    dispatch(removePage(pageId));
  };
}

export function updateTimebarId(focusedPageId, timebarUuid) {
  return (dispatch, getState) => {
    dispatch({ type: 'WS_PAGE_UPDATE_TIMEBARID', payload: { focusedPageId, timebarUuid } });
    const state = getState();
    const windowId = getFocusedWindowId(state);
    dispatch(setModifiedWindow(windowId, true));
  };
}
