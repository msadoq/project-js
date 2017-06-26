import simple from '../helpers/simpleActionCreator';
import * as types from '../types';
import { setRealTime } from '../actions/timebars';
import { getFocusedWindowId } from '../reducers/hsc';
import { getWindowFocusedPageId } from '../reducers/windows';
import { getPage } from '../reducers/pages';
import { getTimebars } from '../reducers/timebars';

/**
 * App lifecycle
 */
export const setWorkspaceModified = simple(types.WS_WORKSPACE_SET_MODIFIED, 'flag');
export const setWindowsAsOpened = simple(types.HSC_SET_WINDOWS_AS_OPENED);
export const isWorkspaceOpening = simple(types.HSC_ISWORKSPACE_OPENING, 'flag');
export const closeWorkspace = simple(types.HSC_CLOSE_WORKSPACE, 'keepMessages');
export const pause = simple(types.HSC_PAUSE);

export const updateDomainName = simple(types.WS_WORKSPACE_UPDATE_DOMAINNAME, 'domainName');
export const updateSessionName = simple(types.WS_WORKSPACE_UPDATE_SESSIONNAME, 'sessionName');

/**
 * Play mode
 */
export const play = simple(types.HSC_PLAY, 'timebarUuid');

export const startInPlayMode = () =>
  (dispatch, getState) => {
    const state = getState();
    const windowId = getFocusedWindowId(state);
    const pageId = getWindowFocusedPageId(state, { windowId });
    const page = getPage(state, { pageId });
    // All timebar switch to real time
    Object.keys(getTimebars(state)).forEach((timebarUuid) => {
      dispatch(setRealTime(timebarUuid, true));
    });
    const { timebarUuid } = page;
    dispatch(play(timebarUuid));
  };
  /*
export const pause = () =>
  (dispatch, getState) => {
    dispatch({ type: types.HSC_PAUSE });
    _keys(getTimebars(getState())).forEach((timebarId) => {
      dispatch(setRealTime(timebarId, false));
    });
  };
*/
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
 * Save focus/blurred window
 */
export const focusWindow = simple(types.HSC_FOCUS_WINDOW, 'windowId');
export const blurWindow = simple(types.HSC_BLUR_WINDOW, 'windowId');
