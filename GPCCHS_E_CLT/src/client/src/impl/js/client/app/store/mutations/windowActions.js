import { v4 } from 'node-uuid';
import simple from './simpleActionCreator';
import * as types from './types';
import { add as addPage, remove as removePage } from './pageActions';

/**
 * Simple actions
 */
export const add = simple(types.WS_WINDOW_ADD, 'windowId', 'title', 'geometry', 'pages', 'pageId');
export const remove = simple(types.WS_WINDOW_REMOVE, 'windowId');
export const focusPage = simple(types.WS_WINDOW_PAGE_FOCUS, 'windowId', 'pageId');
export const mountPage = simple(types.WS_WINDOW_PAGE_MOUNT, 'windowId', 'pageId');
export const unmountPage = simple(types.WS_WINDOW_PAGE_UNMOUNT, 'windowId', 'pageId');
export const reorderPages = simple(types.WS_WINDOW_PAGE_REORDER, 'windowId', 'pages');
export const updateGeometry = simple(types.WS_WINDOW_UPDATE_GEOMETRY,
  'windowId', 'x', 'y', 'w', 'h'
);

/**
 * Compound actions
 */
export function addAndMount(windowId) {
  return dispatch => {
    const pageId = v4();
    dispatch(addPage(pageId));
    dispatch(mountPage(windowId, pageId));
    dispatch(focusPage(windowId, pageId));
  };
}

export function unmountAndRemove(windowId, pageId) {
  return dispatch => {
    dispatch(unmountPage(windowId, pageId));
    dispatch(removePage(pageId));
  };
}
