import _ from 'lodash/fp';
import _map from 'lodash/map';
import { v4 } from 'uuid';
import simple from '../simpleActionCreator';
import ifPathChanged from './enhancers/ifPathChanged';
import * as types from '../types';
import { getFirstTimebarId } from '../reducers/timebars';
import { getFocusedWindowId } from '../reducers/hsc';
import { getPanels, getPages } from '../reducers/pages';

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
export const updateTimebarId = simple(types.WS_PAGE_UPDATE_TIMEBARID, 'pageId', 'timebarUuid');

export const loadInEditor = simple(types.WS_PAGE_PANELS_LOAD_IN_EDITOR, 'pageId', 'viewId');
export const resizeEditor = simple(types.WS_PAGE_PANELS_RESIZE_EDITOR, 'pageId', 'size');
export const minimizeEditor = simple(types.WS_PAGE_PANELS_MINIMIZE_EDITOR, 'pageId', 'isMinimized');
export const resizeTimebar = simple(types.WS_PAGE_PANELS_RESIZE_TIMEBAR, 'pageId', 'size');
export const minimizeTimebar = simple(types.WS_PAGE_PANELS_MINIMIZE_TIMEBAR, 'pageId', 'isMinimized');
export const focusTabInExplorer = simple(types.WS_PAGE_PANELS_FOCUS_IN_EXPLORER, 'pageId', 'focusedTab');
export const resizeExplorer = simple(types.WS_PAGE_PANELS_RESIZE_EXPLORER, 'pageId', 'size');
export const minimizeExplorer = simple(types.WS_PAGE_PANELS_MINIMIZE_EXPLORER, 'pageId', 'isMinimized');
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

export function openEditor(pageId, viewId) { // TODO boxmodel test
  return (dispatch, getState) => {
    let pId = pageId;
    if (!pageId) {
      const pages = _map(getPages(getState()), (v, k) => ({ ...v, id: k }));
      const containsView = p => p.views.some(v => v === viewId);
      const page = _.get('0', _.filter(containsView, pages));
      pId = page.id;
    }
    dispatch(minimizeEditor(pId, false));
    const { editorWidth } = getPanels(getState(), { pId });
    if (!editorWidth || editorWidth < 1) {
      dispatch(resizeEditor(pId, 350));
    }

    dispatch(loadInEditor(pId, viewId));
  };
}
