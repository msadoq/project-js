import simple from '../simpleActionCreator';
import * as types from '../types';

/**
 * App lifecycle
 */
export const updateStatus = simple(types.HSC_UPDATE_STATUS, 'status');
export const setWindowsAsOpened = simple(types.HSC_SET_WINDOWS_AS_OPENED);
export const isWorkspaceOpening = simple(types.HSC_ISWORKSPACE_OPENING, 'flag');

/**
 * Play mode
 */
export const play = simple(types.HSC_PLAY, 'timebarId');
export const pause = simple(types.HSC_PAUSE);

/**
 * Cache invalidation
 */
export const updateCacheInvalidation
  = simple(types.HSC_UPDATE_LAST_CACHE_INVALIDATION, 'timestamp');
