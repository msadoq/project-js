import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * App lifecycle
 */
export const setWorkspaceModified = simple(types.WS_WORKSPACE_SET_MODIFIED, 'flag');
export const setWindowsAsOpened = simple(types.HSC_SET_WINDOWS_AS_OPENED);
export const isWorkspaceOpening = simple(types.HSC_ISWORKSPACE_OPENING, 'flag');
export const closeWorkspace = simple(types.HSC_CLOSE_WORKSPACE, 'keepMessages');
export const pause = simple(types.HSC_PAUSE);

export const askSaveWorkspace = simple(types.WS_ASK_SAVE_WORKSPACE, 'windowId', 'saveAs');
export const askOpenWorkspace = simple(types.WS_ASK_OPEN_WORKSPACE, 'windowId', 'absolutePath', 'isNew', 'noPage');
export const askCloseWorkspace = simple(types.WS_ASK_CLOSE_WORKSPACE, 'windowId', 'keepMessages');

export const updateDomainName = simple(types.WS_WORKSPACE_UPDATE_DOMAINNAME, 'domainName');
export const updateSessionName = simple(types.WS_WORKSPACE_UPDATE_SESSIONNAME, 'sessionName');

export const sendProductLog = (uid, ...args) => ({
  type: types.HSC_SEND_PRODUCT_LOG,
  payload: { uid, args },
});

/**
 * Play mode
 */
export const play = simple(types.HSC_PLAY, 'timebarUuid');

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
