import 'reselect';

export const getTimeline = (state, { timelineId }) => state.timelines[timelineId];
export const getTimelines = state => state.timelines;
