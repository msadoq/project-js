import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _reduce from 'lodash/reduce';
import { createSelector } from 'reselect';
import { getTimelines } from './timelines';

export const getTimebars = state => state.timebars;
export const getTimebar = (state, timebarId) => state.timebars[timebarId];

export const getTimebarTimelinesSelector = createSelector( // TODO TEST
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

/**
 * A selector to get timelines from timebarId.
 * No direct usage of state but receives timebars and timelines due to dataMaps execution context.
 *
 * @param timebars
 * @param timelines
 * @param timebarId
 * @return {*}
 */
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

