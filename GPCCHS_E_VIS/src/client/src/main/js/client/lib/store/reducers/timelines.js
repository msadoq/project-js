import u from 'updeep';
import __ from 'lodash/fp';

import * as types from '../types';
import timeline from './timelines/timeline';

export default function timelines(stateTimelines = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMELINE_ADD:
      return __.set(action.payload.timelineUuid, timeline(undefined, action), stateTimelines);
    case types.WS_TIMELINE_REMOVE:
      return __.omit(action.payload.timelineUuid, stateTimelines);
    default: {
      if (
        action.payload &&
        action.payload.timelineUuid &&
        stateTimelines[action.payload.timelineUuid]
      ) {
        const currentTimeline = stateTimelines[action.payload.timelineUuid];
        return u({
          [action.payload.timelineUuid]: timeline(currentTimeline, action),
        }, stateTimelines);
      }
      return stateTimelines;
    }
  }
}
