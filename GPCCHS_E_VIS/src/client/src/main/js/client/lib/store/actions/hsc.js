import { HEALTH_STATUS_CRITICAL } from 'common/constants';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { isAnyEditorOpened } from '../selectors/pages';
import { getHealthMap } from '../reducers/health';
import { getIsCodeEditorOpened } from '../reducers/editor';
import { addOnce } from './messages';
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
export const updateForecast = simple(types.HSC_UPDATE_FORECAST, 'lower', 'upper');
export const pause = simple(types.HSC_PAUSE);

export const updateDomainName = simple(types.WS_WORKSPACE_UPDATE_DOMAINNAME, 'domainName');
export const updateSessionName = simple(types.WS_WORKSPACE_UPDATE_SESSIONNAME, 'sessionName');

/**
 * Play mode
 */
export const play = simple(types.HSC_PLAY, 'timebarUuid');
export const smartPlay = timebarUuid => // TODO dbrugne test
  (dispatch, getState) => {
    const health = getHealthMap(getState());
    if (
      getIsCodeEditorOpened(getState())
      || isAnyEditorOpened(getState())
    ) {
      dispatch(addOnce(
        'global',
        'warning',
        'Please close editors before play timebar'
        )
      );
    } else if (
      health.dc !== HEALTH_STATUS_CRITICAL
      && health.hss !== HEALTH_STATUS_CRITICAL
      && health.main !== HEALTH_STATUS_CRITICAL
      && health.windows !== HEALTH_STATUS_CRITICAL
    ) {
      dispatch(play(timebarUuid));
    } else {
      dispatch(addOnce(
        'global',
        'warning',
        'One process of the application is oveloaded, cannot switch to play'
        )
      );
    }
  };

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
    dispatch(smartPlay(timebarUuid));
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
