import _omit from 'lodash/omit';
import * as types from '../types';

const initialState = {
  windowsOpened: false,
  workspaceOpened: false,
  playingTimebarId: null,
  lastCacheInvalidation: Date.now(),
  folder: null,
  file: null,
  slowRenderers: [],
  focusWindow: null,
};

export default function hsc(state = initialState, action) {
  switch (action.type) {
    case types.HSC_PLAY:
      return Object.assign({}, state, { playingTimebarId: action.payload.timebarUuid });
    case types.HSC_PAUSE:
      return Object.assign({}, state, { playingTimebarId: null });
    case types.HSC_SET_WINDOWS_AS_OPENED:
      return Object.assign({}, state, { windowsOpened: true });
    case types.HSC_SET_WORKSPACE_AS_OPENED:
      return Object.assign({}, state, { workspaceOpened: true });
    case types.HSC_UPDATE_LAST_CACHE_INVALIDATION:
      return Object.assign({}, state, { lastCacheInvalidation: action.payload.timestamp });
    case types.HSC_ISWORKSPACE_OPENING:
      return Object.assign({}, state, { isWorkspaceOpening: action.payload.flag });
    case types.HSC_UPDATE_PATH:
      return Object.assign({}, state, { folder: action.payload.folder, file: action.payload.file });
    case types.HSC_CLOSE_WORKSPACE:
      return _omit(state, ['folder', 'file']);
    case types.HSC_ADD_SLOW_RENDERER:
      return Object.assign({}, state, {
        slowRenderers: {
          ...state.slowRenderers,
          [action.payload.windowId]: action.payload.interval,
        },
      });
    case types.HSC_REMOVE_SLOW_RENDERER:
      return Object.assign({}, state, {
        slowRenderers: _omit(state.slowRenderers, [action.payload.windowId]),
      });
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
    default:
      return state;
  }
}
