import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { getTimelines } from './timelines';
import { getTimebarTimelines as getTimebarTimelineIds } from './timebarTimelines';

// simple
export const getTimebars = state => state.timebars;
export const getTimebar = (state, { timebarUuid }) => state.timebars[timebarUuid];

// simple
export const getFirstTimebarId = _.pipe(getTimebars, _.keys, _.get(0));

// simple
export const getTimebarMasterId = (state, { timebarUuid }) => _.get(['timebars', timebarUuid, 'masterId'], state);

// composed
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

// composed specific
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
