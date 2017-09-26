// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 22/02/2017 : Fix unexpected return in a forEach
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : Fix bug new Plot view when no timeline + Fix warnings
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #3622 : 02/03/2017 : Add min and max in plot viewData
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Removed timeline.timelineUuid, already has timeline.uuid .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Rename comments about simple/derived selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all timelines simple selectors in store/reducers/timelines
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename somme comments in store/selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getFirstTimebarId simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebarMasterId simple selector in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebarTimelines simple selector in store/reducers/timebarTimelines
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Add some comments . .
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getTimebar and getTimebars simple selectors in store/reducers/timebars
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Move getMasterTimelineById from timebars/selectors to Controls/ControlsSelector.js
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : Add ControlsSelector tests . .
// END-HISTORY
// ====================================================================

import { createSelector } from 'reselect';

import { getTimelines } from '../reducers/timelines';
import { getTimebarTimelines as getTimebarTimelineIds } from '../reducers/timebarTimelines';

import { getTimebarMasterId } from '../reducers/timebars';

const getTimebarTimelinesSelector = createSelector(
  [
    getTimebarMasterId,
    getTimelines,
    getTimebarTimelineIds,
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
