// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Add lint rule on selector signatures
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 28/02/2017 : In actions, reduers, views, timelineId -> timelineUuid to avoid confusion.
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all timelines simple selectors in store/reducers/timelines
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Move getFocusedPageTimelines in global store/selectors .
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Remove Timebar/Controls/ControlsSelectors + tests .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getPage } from '../reducers/pages';
import { getTimebarMasterId } from '../reducers/timebars';
import { getFocusedPage } from './pages';
import { getTimebarTimelinesSelector } from './timebars';

const getState = _.identity;

export const getFocusedPageTimelines = createSelector(
  getState,
  getFocusedPage,
  (state, page = {}) => getTimebarTimelinesSelector(state, { timebarUuid: page.timebarUuid })
);

export const getPageTimelines = createSelector(
  getState,
  getPage,
  (state, page = {}) => getTimebarTimelinesSelector(state, { timebarUuid: page.timebarUuid })
);

export const getMasterTimelineById = createSelector(
  getTimebarMasterId,
  getTimebarTimelinesSelector,
  (masterTimelineId, timebarTimelines) => {
    if (!masterTimelineId) {
      return undefined;
    }
    if (_.isEmpty(timebarTimelines)) {
      return undefined;
    }
    if (timebarTimelines[0].id === masterTimelineId) {
      return timebarTimelines[0];
    }
    return undefined;
  }
);

export default {
  getFocusedPageTimelines,
  getMasterTimelineById,
};
