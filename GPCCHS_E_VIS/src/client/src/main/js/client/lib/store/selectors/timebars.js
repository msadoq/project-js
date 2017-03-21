import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { getTimelines } from './timelines';
import { getTimebarTimelines as getTimebarTimelineIds } from './timebarTimelines';

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
      if (masterId === timelines[tlUuid].id) {
        timebarTimelines.unshift(timelines[tlUuid]);
      } else {
        timebarTimelines.push(timelines[tlUuid]);
      }
    });
    return timebarTimelines;
  }
);

// composed specific (ControlsContainer)
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
