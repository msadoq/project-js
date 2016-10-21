// import _find from 'lodash/find';
import _get from 'lodash/get';
import _map from 'lodash/map';
import { createSelector } from 'reselect';
import { getTimeline } from './timelines';

export const getTimebar = (state, timebarId) => state.timebars[timebarId];

// export function getTimebarById(state, timebarId) { // TODO test
//   return _find(state.timebars, tb => tb.id === timebarId);
// }
export function getTimebarUuidById(state, timebarId) { // TODO test
  for (let key in state.timebars) {
    if (state.timebars[key].id === timebarId) {
      return key;
    }
  }
  return -1;
}
// TODO : deprecate
export function getTimelines(state, timebarId) { // TODO test
  const timelines = _get(state, `timebars.${timebarId}.timelines`, []);
  return timelines.reduce((list, timelineId) => {
    const timeline = getTimeline(state, timelineId);
    return timeline
      ? list.concat(timeline)
      : list;
  }, []);
}

// TODO : deprecate
export function getTimelinesFromTimebar(state, timebar) { // TODO test
  const timelines = timebar ? timebar.timelines : [];
  return timelines.reduce((list, timelineId) => {
    const timeline = getTimeline(state, timelineId);
    return timeline
      ? list.concat(timeline)
      : list;
  }, []);
}

const getTimebarTimelinesIds = (state, { timebarId }) =>
  _get(state, ['timebars', timebarId, 'timelines']);

export function makeGetTimebarTimelines() {
  return createSelector([
    getTimebarTimelinesIds,
    state => state.timelines,
  ], (ids, timelines) => {
    console.log('compute timelines');
    return _map(ids, id => timelines[id]);
  });
}
