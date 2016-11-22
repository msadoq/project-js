import _omit from 'lodash/omit';
import { LIFECYCLE_NOT_STARTED } from 'common/constants';
import * as types from '../types';

const initialState = {
  status: LIFECYCLE_NOT_STARTED,
  playingTimebarId: null,
  lastCacheInvalidation: Date.now(),
};

export default function hsc(state = initialState, action) {
  switch (action.type) {
    case types.HSC_PLAY:
      return Object.assign({}, state, { playingTimebarId: action.payload.timebarId });
    case types.HSC_PAUSE:
      return Object.assign({}, state, { playingTimebarId: null });
    case types.HSC_UPDATE_STATUS:
      return Object.assign({}, state, { status: action.payload.status });
    case types.HSC_UPDATE_LAST_CACHE_INVALIDATION:
      return Object.assign({}, state, { lastCacheInvalidation: action.payload.timestamp });
    case types.HSC_ISWORKSPACE_OPENING:
      return Object.assign({}, state, { isWorkspaceOpening: action.payload.flag });
    case types.HSC_UPDATE_PATH:
      if (state.folder === action.payload.folder) {
        if (state.file === action.payload.file) {
          return state;
        }
        return { ...state, file: action.payload.file };
      }
      // Update all relative path
      return { ...state, folder: action.payload.folder, file: action.payload.file };
    case types.HSC_CLOSE_WORKSPACE:
      return _omit(state, ['folder', 'file']);
    default:
      return state;
  }
}
