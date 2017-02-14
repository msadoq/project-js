import 'reselect';
import path from 'lodash/fp/path';

const inHsc = key => path(['hsc', key]);

export const getWindowsOpened = inHsc('windowsOpened');
export const getWorkspaceOpened = inHsc('workspaceOpened');
export const getLastCacheInvalidation = inHsc('lastCacheInvalidation');
export const getPlayingTimebarId = inHsc('playingTimebarId');
export const getFocusedWindowId = inHsc('focusWindow');
