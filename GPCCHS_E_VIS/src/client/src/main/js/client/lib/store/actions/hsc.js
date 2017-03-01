import { HEALTH_STATUS_CRITICAL } from 'common/constants';
import _keys from 'lodash/keys';
import simple from '../simpleActionCreator';
import * as types from '../types';
import { getHealthMap } from '../selectors/health';
import { getTimebars } from '../selectors/timebars';
import { setRealTime } from './timebars';
import { addOnce } from './messages';

/**
 * App lifecycle
 */
export const setWindowsAsOpened = simple(types.HSC_SET_WINDOWS_AS_OPENED);
export const isWorkspaceOpening = simple(types.HSC_ISWORKSPACE_OPENING, 'flag');
export const closeWorkspace = simple(types.HSC_CLOSE_WORKSPACE);

/**
 * Play mode
 */
export const play = simple(types.HSC_PLAY, 'timebarUuid');
export const smartPlay = timebarUuid => // TODO dbrugne test
  (dispatch, getState) => {
    const health = getHealthMap(getState());
    if (
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
export const pause = () =>
  (dispatch, getState) => {
    dispatch({ type: types.HSC_PAUSE });
    _keys(getTimebars(getState())).forEach((timebarId) => {
      dispatch(setRealTime(timebarId, false));
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
 * Save focus/blurred window
 */
export const focusWindow = simple(types.HSC_FOCUS_WINDOW, 'windowId');
export const blurWindow = simple(types.HSC_BLUR_WINDOW, 'windowId');
