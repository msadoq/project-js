import 'reselect';
import path from 'lodash/fp/path';

const inHsc = key => path(['hsc', key]);

// simples
export const getWindowsOpened = inHsc('windowsOpened');
export const getLastCacheInvalidation = inHsc('lastCacheInvalidation');
export const getPlayingTimebarId = inHsc('playingTimebarId');
export const getFocusedWindowId = inHsc('focusWindow');
export const getIsWorkspaceOpening = inHsc('isWorkspaceOpening');
