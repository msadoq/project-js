import u from 'updeep';
import _ from 'lodash/fp';

import * as types from '../types';
import timeline from './timelines/timeline';

export default function timelines(stateTimelines = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMELINE_CREATE_NEW:
      return _.set(action.payload.timeline.uuid, timeline(undefined, action), stateTimelines);
    case types.WS_TIMELINE_REMOVE:
      return _.omit(action.payload.timelineUuid, stateTimelines);
    case types.WS_WORKSPACE_OPEN: {
      const setPayloadTimeline = _.set('payload.timeline');
      const singleTimelineReducer = stateTl => (
        timeline(undefined, setPayloadTimeline(stateTl, action))
      );
      return _.compose(
        _.defaults(stateTimelines),          // 3. merge with old stateTimelines
        _.indexBy('uuid'),                   // 2. index timelines array by uuid
        _.map(singleTimelineReducer)         // 1. apply single timeline reducer on all timelines
      )(action.payload.timelines);
    }
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
