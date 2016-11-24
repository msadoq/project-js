import { v4 } from 'node-uuid';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { add as addPage, remove as removePage } from './pages';

/**
 * Simple actions
 */
export const add = simple(types.WS_WINDOW_ADD, 'windowId', 'title', 'geometry', 'pages', 'focusedPage');
export const remove = simple(types.WS_WINDOW_REMOVE, 'windowId');
export const focusPage = simple(types.WS_WINDOW_PAGE_FOCUS, 'windowId', 'pageId');
export const mountPage = simple(types.WS_WINDOW_PAGE_MOUNT, 'windowId', 'pageId');
export const unmountPage = simple(types.WS_WINDOW_PAGE_UNMOUNT, 'windowId', 'pageId');
export const reorderPages = simple(types.WS_WINDOW_PAGE_REORDER, 'windowId', 'pages');
export const updateGeometry = simple(types.WS_WINDOW_UPDATE_GEOMETRY,
  'windowId', 'x', 'y', 'w', 'h'
);
export const switchDebug = simple(types.WS_WINDOW_DEBUG_SWITCH, 'windowId', 'which', 'status');
export const setModified = simple(types.WS_WINDOW_SETMODIFIED, 'windowId', 'flag');
/**
 * Compound actions
 */
export function addAndMount(windowId, pageId = v4(), page) {
  return (dispatch) => {
    // const pageId = v4();
    if (!page) {
      dispatch(addPage(pageId));
    } else {
      dispatch(addPage(pageId, page.timebarId, page.title, page.views, page.layout, page.path,
        page.oId, page.absolutePath));
    }
    dispatch(mountPage(windowId, pageId));
    dispatch(focusPage(windowId, pageId));
    // No need to mount views here, this is already done
  };
}

export function unmountAndRemove(windowId, pageId) {
  return (dispatch, getState) => {
    dispatch(unmountPage(windowId, pageId));
    dispatch(removePage(pageId));
    if (getState().windows[windowId].pages.length > 0
        && pageId === getState().windows[windowId].focusedPage) {
      dispatch(focusPage(windowId, getState().windows[windowId].pages[0]));
    }
  };
}
