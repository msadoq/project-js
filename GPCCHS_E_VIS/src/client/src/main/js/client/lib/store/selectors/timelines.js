import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getPage, getPageIdByViewId } from '../reducers/pages';
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

export const getTimelinesByViewId = createSelector(
  getState,
  getPageIdByViewId,
  (state, pageId) => getPageTimelines(state, { pageId })
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
