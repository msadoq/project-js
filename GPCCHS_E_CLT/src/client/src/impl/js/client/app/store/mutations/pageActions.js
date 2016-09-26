import { v4 } from 'node-uuid';
import simple from './simpleActionCreator';
import * as types from './types';
import { add as addView, remove as removeView } from './viewActions';

/**
 * Simple actions
 */
export const add = simple(types.WS_PAGE_ADD, 'pageId', 'timebarId', 'title', 'views', 'layout');
export const remove = simple(types.WS_PAGE_REMOVE, 'pageId');
export const mountView = simple(types.WS_PAGE_VIEW_MOUNT, 'pageId', 'viewId');
export const unmountView = simple(types.WS_PAGE_VIEW_UNMOUNT, 'pageId', 'viewId');
export const openEditor = simple(types.WS_PAGE_EDITOR_OPEN,
  'pageId', 'viewId', 'viewType', 'configuration');
export const closeEditor = simple(types.WS_PAGE_EDITOR_CLOSE, 'pageId');
export const updateLayout = simple(types.WS_PAGE_UPDATE_LAYOUT, 'pageId', 'layout');

/**
 * Compound actions
 */
export function addAndMount(pageId) {
  return dispatch => {
    const viewId = v4();
    dispatch(addView(viewId));
    dispatch(mountView(pageId, viewId));
  };
}

export function unmountAndRemove(pageId, viewId) {
  return dispatch => {
    dispatch(unmountView(pageId, viewId));
    dispatch(removeView(viewId));
  };
}

export function openViewInEditor(pageId, viewId) { // TODO
  return (dispatch, state) => {
    // TODO : check if view exist
    // TODO : check if view is displayed on page
    // TODO : dispatch openEditor
  };
}
