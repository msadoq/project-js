import u from 'updeep';
import __ from 'lodash/fp';

import * as types from '../types';
import timeline from './timelines/timeline';

export default function timelines(stateTimelines = {}, action) {
  const { payload = {} } = action;
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMELINE_ADD:
      return __.set(payload.timelineId, timeline(undefined, action), stateTimelines);
    case types.WS_TIMELINE_REMOVE:
      return __.omit(payload.timelineId, stateTimelines);
    default: {
      if (!payload.timelineId || !stateTimelines[payload.timelineId]) {
        return stateTimelines;
      }
      const currentTimebar = stateTimelines[payload.timelineId];
      return u({
        [payload.timelineId]: timeline(currentTimebar, action),
      }, stateTimelines);
    }
  }
}
