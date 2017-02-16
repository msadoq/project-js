import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _values from 'lodash/values';
import _reduce from 'lodash/reduce';
import _toPairs from 'lodash/toPairs';
import { createSelector } from 'reselect';
import { getTimelines } from './timelines';
import { getPage } from './pages';

export const getTimebars = state => state.timebars;
export const getTimebar = (state, { timebarUuid }) => state.timebars[timebarUuid];

export const getTimebarByPageId = (state, { pageId }) => {
  const page = getPage(state, { pageId });
  if (!page) return undefined;
  return getTimebar(state, { timebarUuid: page.timebarUuid });
};

export const getTimebarTimelinesSelector = createSelector(
  (state, { timebarUuid }) => getTimebar(state, { timebarUuid }),
  getTimelines,
  (timebar, timelines) => {
    if (!timebar) {
      return [];
    }
    const timebarTimelines = [];
    _toPairs(timelines).forEach((v) => {
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
 * A selector to get timelines from timebarUuid.
 * No direct usage of state but receives timebars and timelines due to dataMaps execution context.
 *
 * @param timebars
 * @param timelines
 * @param timebarUuid
 * @return {*}
 */
export function _getTimebarTimelines(timebars, timelines, timebarUuid) {
  const timebarTimelines = _get(timebars, [timebarUuid, 'timelines']);
  return _reduce(timebarTimelines, (list, timelineId) => {
    const timeline = _get(timelines, timelineId);
    if (!timeline || !timeline.id || !_isNumber(timeline.sessionId)) {
      return list;
    }

    return list.concat(timeline);
  }, []);
}

/**
 * A selector to get master timeline from timebarUuid.
 * No direct usage of state but receives timebars and timelines due to dataMaps execution context.
 *
 * @param timebars
 * @param timelines
 * @param timebarUuid
 * @return {*}
 */
export function _getMasterTimeline(timebars, timelines, timebarUuid) {
  const masterTimelineId = _get(timebars, [timebarUuid, 'masterId']);
  if (!masterTimelineId) {
    return undefined;
  }

  return _values(timelines).find(t => t.id === masterTimelineId);
}

export function getMasterTimelineById(state, { timebarUuid }) {
  const timelines = getTimebarTimelinesSelector(state, { timebarUuid });
  const masterTimelineId = _get(state.timebars, [timebarUuid, 'masterId']);
  if (!masterTimelineId) {
    return undefined;
  }

  return _values(timelines).find(t => t.id === masterTimelineId);
}
