import _ from 'lodash';
import * as types from '../types';

/**
 * Reducer
 */
export default function timelines(stateTimelines = {}, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD:
      return {
        ...stateTimelines,
        [action.payload.timelineId]: timeline(undefined, action),
      };
    case types.WS_TIMELINE_REMOVE:
      return _.omit(stateTimelines, [action.payload.timelineId]);
    default:
      return stateTimelines;
  }
}

const initialState = {
  id: null,
  offset: 0,
  kind: 'Session',
  sessionId: null,
};

function timeline(stateTimeline = initialState, action) {
  switch (action.type) {
    case types.WS_TIMELINE_ADD: {
      const configuration = _.get(action, 'payload.configuration', {});
      return Object.assign({}, stateTimeline, {
        id: configuration.id || initialState.id,
        offset: configuration.offset || initialState.offset,
        kind: configuration.kind || initialState.kind,
        sessionId: configuration.sessionId || initialState.sessionId,
      });
    }
    default:
      return stateTimeline;
  }
}
