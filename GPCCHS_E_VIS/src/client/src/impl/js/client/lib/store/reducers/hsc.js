import _omit from 'lodash/omit';
import { LIFECYCLE_NOT_STARTED } from 'common/constants';
import * as types from '../types';

const initialState = {
  status: LIFECYCLE_NOT_STARTED,
  windowsOpened: false,
  workspaceOpened: false,
  playingTimebarId: null,
  lastCacheInvalidation: Date.now(),
  folder: null,
  file: null,
  slowRenderers: [],
};

export default function hsc(state = initialState, action) {
  switch (action.type) {
    case types.HSC_PLAY:
      return Object.assign({}, state, { playingTimebarId: action.payload.timebarId });
    case types.HSC_PAUSE:
      return Object.assign({}, state, { playingTimebarId: null });
    case types.HSC_UPDATE_STATUS:
      return Object.assign({}, state, { status: action.payload.status });
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
    default:
      return state;
  }
}
