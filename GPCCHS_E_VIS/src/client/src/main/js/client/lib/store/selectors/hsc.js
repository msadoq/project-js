import path from 'lodash/fp/path';

const getInHsc = key => path(['hsc', key]);

export const getWindowsOpened = getInHsc('windowsOpened');
export const getWorkspaceOpened = getInHsc('workspaceOpened');
export const getLastCacheInvalidation = getInHsc('lastCacheInvalidation');
export const getPlayingTimebarId = getInHsc('playingTimebarId');
export const getFocusedWindowId = getInHsc('focusWindow');
