import _get from 'lodash/get';

// TODEL
export const getTimebarsTimelines = state => _get(state, 'timebarTimelines', {});

// simple
export const getTimebarTimelines =
  (state, { timebarUuid }) => _get(state, ['timebarTimelines', timebarUuid], []);
