import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import { createSelector } from 'reselect';

export const getTimebar = (state, timebarId) => state.timebars[timebarId];

export function getTimebarUuidById(state, timebarId) { // TODO test
  for (const key in state.timebars) {
    if (state.timebars[key].id === timebarId) {
      return key;
    }
  }
  return -1;
}

export function getTimebarTimelines(timebars, timelines, timebarId) {
  const timebarTimelines = _get(timebars, [timebarId, 'timelines']);
  return _reduce(timebarTimelines, (list, timelineId) => {
    const timeline = _get(timelines, timelineId);
    if (!timeline || !timeline.id || !_isNumber(timeline.sessionId)) {
      return list;
    }

    return list.concat(timeline);
  }, []);
}

const getTimebarTimelinesIds = (state, { timebarId }) =>
  _get(state, ['timebars', timebarId, 'timelines']);

export function makeGetTimebarTimelines() {
  return createSelector([
    getTimebarTimelinesIds,
    state => state.timelines,
  ],
  (ids, timelines) => _map(ids, id => timelines[id])
  );
}
