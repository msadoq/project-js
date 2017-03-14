import _ from 'lodash/fp';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { pause } from './hsc';
import { getWindowPages } from '../selectors/windows';
import { getPage } from '../selectors/pages';
import { getPlayingTimebarId } from '../selectors/hsc';

/**
 * Simple actions
 */
export const addWindow = simple(types.WS_WINDOW_ADD, 'windowId', 'title', 'geometry', 'pages',
  'focusedPage', 'isModified');
export const closeWindow = simple(types.WS_WINDOW_CLOSE, 'windowId');
export const setIsLoaded = simple(types.WS_WINDOW_SET_IS_LOADED, 'windowId');

export const reorderPages = simple(types.WS_WINDOW_PAGE_REORDER, 'windowId', 'pages');
export const updateGeometry = simple(types.WS_WINDOW_UPDATE_GEOMETRY,
  'windowId', 'x', 'y', 'w', 'h'
);
export const setModified = simple(types.WS_WINDOW_SETMODIFIED, 'windowId', 'flag');
export const minimize = simple(types.WS_WINDOW_MINIMIZE, 'windowId');
export const restore = simple(types.WS_WINDOW_RESTORE, 'windowId');

export const displayExplorer = simple(types.WS_WINDOW_DISPLAY_EXPLORER, 'windowId', 'open');
export const currentExplorer = simple(types.WS_WINDOW_CURRENT_EXPLORER, 'windowId', 'tabName');
export const updateExplorerWidth = simple(types.WS_WINDOW_EXPLORERWIDTH_UPDATE, 'windowId', 'width');
export const updateExplorerFlag = simple(types.WS_WINDOW_EXPLORER_UPDATEFLAG, 'windowId', 'flagName', 'flag');

/**
 * Compound actions
 */

export function focusPage(windowId, pageId) {
  return (dispatch, getState) => {
    const state = getState();

    const getFirstPage = _.compose(_.get('[0]'), getWindowPages);
    const focusedPage = getPage(state, { pageId }) || getFirstPage(state, { windowId });
    if (!focusedPage) {
      return;
    }

    const playingTimebarId = getPlayingTimebarId(state);
    if (playingTimebarId && playingTimebarId !== focusedPage.timebarUuid) {
      // switch to pause when changing for another timebar
      dispatch(pause());
    }

    dispatch({
      type: types.WS_WINDOW_PAGE_FOCUS,
      payload: {
        windowId,
        pageId: focusedPage.pageId,
      },
    });
  };
}
