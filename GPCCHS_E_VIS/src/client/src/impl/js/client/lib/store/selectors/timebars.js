import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import { getTimelines } from './timelines';

export const getTimebar = (state, timebarId) => state.timebars[timebarId];

export const getTimebarTimelinesSelector = createSelector(
  [
    (state, timebarId) => getTimebar(state, timebarId),
    getTimelines,
  ],
  (timebar, timelines) => {
    const timebarTimelines = [];
    Object.entries(timelines).forEach((v) => {
      if (timebar.timelines.includes(v[0])) {
        const newTimeline = { ...v[1], timelineId: v[0] };
        if (timebar.masterId === v[1].id) {
          timebarTimelines.unshift(newTimeline);
        } else {
          timebarTimelines.push(newTimeline);
        }
      }
    });
    return timebarTimelines;
  }
);

// export function getTimebarById(state, timebarId) { // TODO test
//   return _find(state.timebars, tb => tb.id === timebarId);
// }
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
