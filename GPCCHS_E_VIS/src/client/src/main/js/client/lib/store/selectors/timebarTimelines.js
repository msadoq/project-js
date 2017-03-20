import _get from 'lodash/get';

// simple
// eslint-disable-next-line import/prefer-default-export
export const getTimebarTimelines =
  (state, { timebarUuid }) => _get(state, ['timebarTimelines', timebarUuid], []);
