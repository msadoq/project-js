import _get from 'lodash/get';

export const getTimebarsTimelines = state => _get(state, 'timebarTimelines', {});
export const getTimebarTimelines =
  (state, { timebarUuid }) => _get(state, ['timebarTimelines', timebarUuid], []);
