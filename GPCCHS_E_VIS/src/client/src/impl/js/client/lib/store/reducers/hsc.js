import { LIFECYCLE_NOT_STARTED } from 'common/constants';
import * as types from '../types';

const initialState = {
  status: LIFECYCLE_NOT_STARTED,
  lastCacheInvalidation: Date.now(),
};

export default function hsc(state = initialState, action) {
  switch (action.type) {
    case types.HSC_UPDATE_STATUS:
      return Object.assign({}, state, { status: action.payload.status });
    case types.HSC_UPDATE_LAST_CACHE_INVALIDATION:
      return Object.assign({}, state, { lastCacheInvalidation: action.payload.timestamp });
    case types.HSC_ISWORKSPACE_OPENING:
      return Object.assign({}, state, { isWorkspaceOpening: action.payload.flag });
    default:
      return state;
  }
}
