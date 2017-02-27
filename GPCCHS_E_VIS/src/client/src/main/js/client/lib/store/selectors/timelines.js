import 'reselect';

export const getTimeline = (state, { timelineUuid }) => state.timelines[timelineUuid];
export const getTimelines = state => state.timelines;
