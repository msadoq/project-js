import _ from 'lodash/fp';
import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import _values from 'lodash/values';
import _reduce from 'lodash/reduce';

import _isEqual from 'lodash/isEqual';
import { createSelector, defaultMemoize, createSelectorCreator } from 'reselect';

import { getTimelines } from './timelines';
import { getPage } from './pages';
import { getTimebarTimelines as getTimebarTimelineIds } from './timebarTimelines';

export const getTimebars = state => state.timebars;
export const getTimebar = (state, { timebarUuid }) => state.timebars[timebarUuid];

export const getFirstTimebarId = _.pipe(getTimebars, _.keys, _.get(0));

export const getTimebarByPageId = (state, { pageId }) => {
  const page = getPage(state, { pageId });
  if (!page) return undefined;
  return getTimebar(state, { timebarUuid: page.timebarUuid });
};
export const getTimebarMasterId = (state, { timebarUuid }) => _get(state, ['timebars', timebarUuid, 'masterId']);
export const getTimebarTimelinesSelector = createSelector(
  [
    getTimebarMasterId,
    getTimelines,
    getTimebarTimelineIds, // (state, {timebarUuid})
  ],
  (masterId, timelines, tbTimelines) => { // Array of timelineUuid of the current timebar
    if (!tbTimelines.length) {
      return [];
    }
    const timebarTimelines = [];
    tbTimelines.forEach((tlUuid) => {
      const newTimeline = Object.assign({}, timelines[tlUuid], { timelineUuid: tlUuid });
      if (masterId === timelines[tlUuid].id) {
        timebarTimelines.unshift(newTimeline);
      } else {
        timebarTimelines.push(newTimeline);
      }
    });
    return timebarTimelines;
  }
);

/**
 * A selector to get timelines from timebarUuid.
 * No direct usage of state but receives timebars and timelines due to dataMaps execution context.
 *
 * @param timebarTimelines
 * @param timelines
 * @return {*}
 */
export function _getTimebarTimelines(timebarTimelines, timelines) {
  return _reduce(timebarTimelines, (list, timelineId) => {
    const timeline = _get(timelines, timelineId);
    if (!timeline || !timeline.id || !_isNumber(timeline.sessionId)) {
      return list;
    }

    return list.concat(timeline);
  }, []);
}

// ********************************************************
function timelineEqualityCheck(current, previous) {
  return _isEqual(current.timelines, previous.timelines);
}
const createDeepEqualSelectorForTimelines = createSelectorCreator(
  defaultMemoize,
  timelineEqualityCheck
);
export const timebarTimelinesSelector = createDeepEqualSelectorForTimelines(
  getTimelines,
  (state, { timebarUuid }) => getTimebar(state, timebarUuid),
  (state, { timelines, timebar }) => {
    if (!timebar) {
      return [];
    }
    return _reduce(timebar.timelines, (list, timelineId) => {
      const timeline = _get(timelines, timelineId);
      if (!timeline || !timeline.id || !_isNumber(timeline.sessionId)) {
        return list;
      }
      return list.concat(timeline);
    }, []);
  }
);
// ********************************************************

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

export const getMasterTimelineById = createSelector(
  getTimebarMasterId,
  getTimebarTimelinesSelector,
  (masterTimelineId, timebarTimelines) => {
    if (!masterTimelineId) {
      return undefined;
    }
    if (!timebarTimelines || timebarTimelines.length === 0) {
      return undefined;
    }
    if (timebarTimelines[0].id === masterTimelineId) {
      return timebarTimelines[0];
    }
    return undefined;
  });
