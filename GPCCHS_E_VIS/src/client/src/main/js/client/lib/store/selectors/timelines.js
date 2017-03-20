import 'reselect';

// simple
export const getTimeline = (state, { timelineUuid }) => state.timelines[timelineUuid];

// simple
export const getTimelines = state => state.timelines;
