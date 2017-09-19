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
