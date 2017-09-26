// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for each reducer
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove store/selectors/hsc . . .
// VERSION : 1.1.2 : DM : #5828 : 30/03/2017 : Create 2 news selectors in hsc reducer
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : request modification to add forecast
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : Window title edit : star appears on window, workspace is isModified: true.
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Creation of display queries to pull data from server and always add new data to queue
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Fix forecast when focused page changes and visuWindow goes backwards
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Merge branch 'dev' into simplify_datamap
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Save domainName and sessionName in file for view, page and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #5846 : 10/05/2017 : Add option to launch vima in realtime play mode
// VERSION : 1.1.2 : FA : ISIS-FT-2132 : 21/06/2017 : Fix opening a workspace from menu
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Move windows observer from main orchestration in a pure store observer
// VERSION : 1.1.2 : DM : #6700 : 21/06/2017 : Merge branch 'dev' into dbrugne-lifecycle
// VERSION : 1.1.2 : DM : #6700 : 22/06/2017 : Remove forcast info from Redux store
// VERSION : 1.1.2 : DM : #6700 : 26/06/2017 : Remove forcast info from Redux store
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : SaveAgentModal component can be in a workspace mode
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Open or close a window now set workspace isModified to true
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Open a blank workspace, set isModified to true by default
// VERSION : 1.1.2 : FA : #7145 : 27/07/2017 : Use withlistenAction middleware enhancer in onOpenWorkspace
// VERSION : 1.1.2 : FA : #7328 : 02/08/2017 : Fix closing vima when default workspace is unknown or invalid
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : Add isWorkspaceOpened boolean in hsc state
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  isWorkspaceOpened: false,
  isWorkspaceOpening: true,
  windowsOpened: false,
  playingTimebarId: null,
  lastCacheInvalidation: Date.now(),
  folder: null,
  file: null,
  focusWindow: null,
  isModified: false,
  forecast: {},
  domainName: null,
  sessionName: null,
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function hsc(state = initialState, action) {
  switch (action.type) {
    case types.HSC_PLAY:
      return Object.assign({}, state, { playingTimebarId: action.payload.timebarUuid });
    case types.HSC_PAUSE:
      return Object.assign({}, state, { playingTimebarId: null });
    case types.HSC_SET_WINDOWS_AS_OPENED:
    case types.WS_WINDOW_SET_IS_LOADED:
      return Object.assign({}, state, { windowsOpened: true });
    case types.HSC_UPDATE_LAST_CACHE_INVALIDATION:
      return Object.assign({}, state, { lastCacheInvalidation: action.payload.timestamp });
    case types.HSC_ISWORKSPACE_OPENING:
      return Object.assign({}, state, { isWorkspaceOpening: action.payload.flag });
    case types.HSC_UPDATE_PATH:
      return Object.assign({}, state, { folder: action.payload.folder, file: action.payload.file });
    case types.HSC_CLOSE_WORKSPACE:
      return _.pipe(
        _.omit(['file', 'folder']),
        _.set('isWorkspaceOpened', false)
      )(state);
    case types.HSC_FOCUS_WINDOW:
      return Object.assign({}, state, {
        focusWindow: action.payload.windowId,
      });
    case types.HSC_BLUR_WINDOW:
      if (state.focusWindow === action.payload.windowId) {
        return Object.assign({}, state, {
          focusWindow: null,
        });
      }
      return state;
    case types.WS_TIMELINE_CREATE_NEW:
    case types.WS_TIMELINE_REMOVE:
    case types.WS_PAGE_TIMEBAR_MOUNT:
    case types.WS_PAGE_TIMEBAR_UNMOUNT:
    case types.WS_WINDOW_PAGE_REORDER:
    case types.WS_WINDOW_MOVE_TAB_ORDER:
    case types.WS_PAGE_UPDATE_ABSOLUTEPATH:
    case types.WS_WINDOW_UPDATE_TITLE:
    case types.WS_WINDOW_ADD:
    case types.WS_WINDOW_CLOSE:
      return _.set('isModified', true, state);
    case types.WS_WORKSPACE_SET_MODIFIED: {
      return _.set('isModified', action.payload.flag, state);
    }
    case types.WS_WORKSPACE_OPENED:
      return { ...state,
        isWorkspaceOpened: true,
        isModified: !!action.payload.isModified,
        domainName: action.payload.domainName,
        sessionName: action.payload.sessionName,
      };
    // Forecast Management
    case types.WS_PAGE_OPENED:
    case types.WS_PAGE_ADD_BLANK:
    case types.WS_PAGE_CLOSE:
      return Object.assign({}, state, {
        forecast: {},
        isModified: true,
      });
    case types.WS_WINDOW_PAGE_FOCUS:
      return Object.assign({}, state, { forecast: {} });
    case types.HSC_UPDATE_FORECAST:
      return Object.assign({}, state, { forecast: {
        upper: action.payload.upper,
        lower: action.payload.lower,
      } });
    case types.WS_WORKSPACE_UPDATE_DOMAINNAME:
      if (action.payload.domainName) {
        return { ...state, domainName: action.payload.domainName, isModified: true };
      }
      return Object.assign({}, _.omit('domainName', state), { isModified: true });
    case types.WS_WORKSPACE_UPDATE_SESSIONNAME:
      if (action.payload.sessionName) {
        return { ...state, sessionName: action.payload.sessionName, isModified: true };
      }
      return Object.assign({}, _.omit('sessionName', state), { isModified: true });
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

const inHsc = (key, fallback) => _.pathOr(fallback, ['hsc', key]);

// simples
export const getWorkspaceFile = inHsc('file');
export const getWorkspaceFolder = inHsc('folder');
export const getWindowsOpened = inHsc('windowsOpened'); // TODO rename getIsWindowsOpened
export const getLastCacheInvalidation = inHsc('lastCacheInvalidation');
export const getPlayingTimebarId = inHsc('playingTimebarId');
export const getFocusedWindowId = inHsc('focusWindow');
export const getIsWorkspaceOpening = inHsc('isWorkspaceOpening');
export const getIsWorkspaceOpened = inHsc('isWorkspaceOpened');
export const getWorkspaceIsModified = inHsc('isModified', false);
export const getDomainName = inHsc('domainName');
export const getSessionName = inHsc('sessionName');
export const getWorkspaceIsNew = state => (!state.hsc.file && !state.hsc.folder);
