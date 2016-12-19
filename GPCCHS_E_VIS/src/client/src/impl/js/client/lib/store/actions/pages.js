import { v4 } from 'node-uuid';
// import _findIndex from 'lodash/findIndex';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { getView } from '../selectors/views';
import {
  add as addView,
  remove as removeView,
  setCollapsed as setCollapsedView,
} from './views';
import { addAndMount as addAndMountPage, focusPage } from './windows';
/**
 * Simple actions
 */
export const add = simple(types.WS_PAGE_ADD, 'pageId', 'timebarId', 'title', 'views', 'layout',
  'path', 'oId', 'absolutePath', 'isModified');
export const removePage = simple(types.WS_PAGE_REMOVE, 'pageId');
export const mountView = simple(types.WS_PAGE_VIEW_MOUNT, 'pageId', 'viewId', 'layout');
export const unmountView = simple(types.WS_PAGE_VIEW_UNMOUNT, 'pageId', 'viewId');
export const openEditor = simple(types.WS_PAGE_EDITOR_OPEN,
  'pageId', 'viewId', 'viewType', 'configuration');
export const closeEditor = simple(types.WS_PAGE_EDITOR_CLOSE, 'pageId');
export const updateLayoutSimple = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');
export const updateLayout = (pageId, layout) =>
  (dispatch, getState) => {
    layout.forEach((l) => {
      if (l.h > 1) {
        const view = getView(getState(), l.i);
        if (view && view.isCollapsed) {
          dispatch(setCollapsedView(l.i, false));
        }
      }
      dispatch(updateLayoutSimple(pageId, layout));
    });
  };
export const updateAbsolutePath = simple(types.WS_PAGE_UPDATE_ABSOLUTEPATH, 'pageId', 'newPath');
export const updatePath = simple(types.WS_PAGE_UPDATEPATH, 'pageId', 'newPath');
export const setModified = simple(types.WS_PAGE_SETMODIFIED, 'pageId', 'flag');

export const updateTimebarId = simple(types.WS_PAGE_UPDATE_TIMEBARID, 'focusedPageId', 'timebarId');
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
    const views = state.pages[pageId].views; // tableau
    views.forEach((viewId) => {
      dispatch(unmountAndRemove(pageId, viewId));
    });
    dispatch(removePage(pageId));
  };
}
