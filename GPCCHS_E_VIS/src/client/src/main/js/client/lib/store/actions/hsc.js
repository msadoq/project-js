// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 20/02/2017 : Write hsc thunks tests .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove useless workspaceOpened in state.hsc
// VERSION : 1.1.2 : FA : #5846 : 17/03/2017 : Add REALTIME config parameter .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/health . . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Remove messages when close a workspace
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Remove visuWindow from document .
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Check if editors are closed in smartPlay action creator
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Test check editor is closed in smart play action creator
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : request modification to add forecast
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Creation of display queries to pull data from server and always add new data to queue
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Fix forecast when focused page changes and visuWindow goes backwards
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : change thunk pause into simple action
// VERSION : 1.1.2 : FA : #5846 : 12/05/2017 : Launch vima in real time play mode: create a unique action
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge with dev
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Remove some useless 'addOnce' (messages) .
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files. Possibility to add it in editor using context menu
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : Merge dev in abesson-mimic .
// VERSION : 1.1.2 : FA : #6670 : 21/06/2017 : Add basic player middleware .
// VERSION : 1.1.2 : DM : #6700 : 22/06/2017 : Remove forcast info from Redux store
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Remove startInPlay feature . .
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Remove forcast info from Redux store
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Fix mechansim for open/save/close workspace
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Ask open workspace at start in mainProcess/index
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : SaveAgentModal component can be in a workspace mode
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Correct VIMA shutdown on new workspace : add middleware for synchronous treatment
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess + replace old IPC productLog
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : A blank workspace can be opened without pages
// END-HISTORY
// ====================================================================

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
