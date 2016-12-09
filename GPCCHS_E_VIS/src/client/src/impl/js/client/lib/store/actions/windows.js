import { v4 } from 'node-uuid';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { pause } from './hsc';
import { add as addPage, remove as removePage } from './pages';
import { getPage } from '../selectors/pages';
import { getPlayingTimebarId } from '../selectors/hsc';

/**
 * Simple actions
 */
export const add = simple(types.WS_WINDOW_ADD, 'windowId', 'title', 'geometry', 'pages',
  'focusedPage', 'isModified');
export const remove = simple(types.WS_WINDOW_REMOVE, 'windowId');
export const mountPage = simple(types.WS_WINDOW_PAGE_MOUNT, 'windowId', 'pageId');
export const unmountPage = simple(types.WS_WINDOW_PAGE_UNMOUNT, 'windowId', 'pageId');
export const reorderPages = simple(types.WS_WINDOW_PAGE_REORDER, 'windowId', 'pages');
export const updateGeometry = simple(types.WS_WINDOW_UPDATE_GEOMETRY,
  'windowId', 'x', 'y', 'w', 'h'
);
export const switchDebug = simple(types.WS_WINDOW_DEBUG_SWITCH, 'windowId', 'which', 'status');
export const setModified = simple(types.WS_WINDOW_SETMODIFIED, 'windowId', 'flag');
export const minimize = simple(types.WS_WINDOW_MINIMIZE, 'windowId');
export const restore = simple(types.WS_WINDOW_RESTORE, 'windowId');

/**
 * Compound actions
 */
export function focusPage(windowId, pageId) {
  return (dispatch, getState) => {
    const playingTimebarId = getPlayingTimebarId(getState());
    const newPage = getPage(getState(), pageId);
    if (playingTimebarId && playingTimebarId !== newPage.timebarId) {
      // switch to pause when changing for another timebar
      dispatch(pause());
    }
    dispatch({
      type: types.WS_WINDOW_PAGE_FOCUS,
      payload: {
        windowId,
        pageId,
      },
    });
  };
}
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
