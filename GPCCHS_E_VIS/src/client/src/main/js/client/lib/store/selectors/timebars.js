import { createSelector } from 'reselect';

import { getTimelines } from '../reducers/timelines';
import { getTimebarTimelines as getTimebarTimelineIds } from '../reducers/timebarTimelines';

import { getTimebarMasterId } from '../reducers/timebars';

const getTimebarTimelinesSelector = createSelector(
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

export default {
  getTimebarTimelinesSelector,
};
