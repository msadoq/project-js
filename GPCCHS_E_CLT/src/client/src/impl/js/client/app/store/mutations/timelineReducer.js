import _ from 'lodash';
import * as types from './types';

/**
 * Reducer
 */
export default function timelines(state = {}, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD:
      return {
        ...state,
        [action.payload.timelineId]: timeline(undefined, action),
      };
    case types.WS_TIMELINE_REMOVE:
      return _.omit(state, [action.payload.timelineId]);
    default:
      return state;
  }
}

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionId: null,
};

function timeline(state = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD: {
      const configuration = _.get(action, 'payload.configuration', {});
      return Object.assign({}, state, {
        id: configuration.id || initialState.id,
        offset: configuration.offset || initialState.offset,
        kind: configuration.kind || initialState.kind,
        sessionId: configuration.sessionId || initialState.sessionId,
      });
    }
    default:
      return state;
  }
}

/**
 * Selectors
 */
export function getTimeline(state, timelineId) {
  return state.timelines[timelineId];
}
