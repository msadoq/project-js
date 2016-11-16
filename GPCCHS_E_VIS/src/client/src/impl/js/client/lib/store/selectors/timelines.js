// eslint-disable-next-line import/prefer-default-export
export const getTimeline = (state, timelineId) => state.timelines[timelineId];
export const getTimelines = state => state.timelines;

export const getTimebarTimelinesSelector = (state, timelineId) => state.timelines[timelineId];
