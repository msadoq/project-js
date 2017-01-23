import _toPairs from 'lodash/toPairs';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { getTimebars } from '../selectors/timebars';
import { setRealTime } from './timebars';

/**
 * App lifecycle
 */
export const setWindowsAsOpened = simple(types.HSC_SET_WINDOWS_AS_OPENED);
export const setWorkspaceAsOpened = simple(types.HSC_SET_WORKSPACE_AS_OPENED);
export const isWorkspaceOpening = simple(types.HSC_ISWORKSPACE_OPENING, 'flag');
export const closeWorkspace = simple(types.HSC_CLOSE_WORKSPACE);

/**
 * Play mode
 */
export const play = simple(types.HSC_PLAY, 'timebarUuid');
export const pause = () =>
  (dispatch, getState) => {
    dispatch({ type: types.HSC_PAUSE });
    _toPairs(getTimebars(getState())).forEach((timebar) => {
      if (timebar[1].realTime) {
        dispatch(setRealTime(timebar[0], false));
      }
    });
  };

/**
 * Cache invalidation
 */
export const updateCacheInvalidation
  = simple(types.HSC_UPDATE_LAST_CACHE_INVALIDATION, 'timestamp');

/**
 * workspace path
 */
export const updatePath = simple(types.HSC_UPDATE_PATH, 'folder', 'file');

/**
 * Identify slow renderers to ignore some ticks in orchestration
 */
export const removeSlowRenderer = simple(types.HSC_REMOVE_SLOW_RENDERER, 'windowId');
export const addSlowRenderer = simple(types.HSC_ADD_SLOW_RENDERER, 'windowId', 'interval');

/**
 * Save focus/blurred window
 */
export const focusWindow = simple(types.HSC_FOCUS_WINDOW, 'windowId');
export const blurWindow = simple(types.HSC_BLUR_WINDOW, 'windowId');
