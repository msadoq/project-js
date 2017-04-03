import _ from 'lodash/fp';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { pause } from './hsc';
import { getPlayingTimebarId } from '../reducers/hsc';
import { getPage } from '../reducers/pages';
import { getWindowPages } from '../selectors/windows';
import { getWindowAllViewsIds } from '../selectors/views';
import { getWindowPageIds } from '../reducers/windows';


/**
 * Simple actions
 */
export const addWindow = simple(types.WS_WINDOW_ADD, 'windowId', 'title', 'geometry', 'pages',
  'focusedPage', 'isModified');

export const closeWindow = windowId => (dispatch, getState) => {
  const state = getState();
  const pages = getWindowPageIds(state, { windowId });
  const views = getWindowAllViewsIds(state, { windowId });
  dispatch({
    type: types.WS_WINDOW_CLOSE,
    payload: {
      windowId,
      views,
      pages,
    },
  });
};

// export const closeWindow = simple(types.WS_WINDOW_CLOSE, 'windowId');
export const setIsLoaded = simple(types.WS_WINDOW_SET_IS_LOADED, 'windowId');

export const reorderPages = simple(types.WS_WINDOW_PAGE_REORDER, 'windowId', 'pages');
export const updateGeometry = simple(types.WS_WINDOW_UPDATE_GEOMETRY,
  'windowId', 'x', 'y', 'w', 'h'
);
export const setModified = simple(types.WS_WINDOW_SETMODIFIED, 'windowId', 'flag');
export const minimize = simple(types.WS_WINDOW_MINIMIZE, 'windowId');
export const restore = simple(types.WS_WINDOW_RESTORE, 'windowId');

export const displayHelp = simple(types.WS_WINDOW_SET_DISPLAY_HELP, 'windowId', 'display');

export const moveTabOrder = simple(types.WS_WINDOW_MOVE_TAB_ORDER, 'windowId', 'keyFrom', 'keyTarget');

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
