import u from 'updeep';
import __ from 'lodash/fp';

import * as types from '../types';
import timeline from './timelines/timeline';

export default function timelines(stateTimelines = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMELINE_ADD:
      return __.set(action.payload.timelineId, timeline(undefined, action), stateTimelines);
    case types.WS_TIMELINE_REMOVE:
      return __.omit(action.payload.timelineId, stateTimelines);
    default: {
      if (
        action.payload &&
        action.payload.timelineId &&
        stateTimelines[action.payload.timelineId]
      ) {
        const currentTimebar = stateTimelines[action.payload.timelineId];
        return u({
          [action.payload.timelineId]: timeline(currentTimebar, action),
        }, stateTimelines);
      }
      return stateTimelines;
    }
  }
}
