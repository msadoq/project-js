import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getFocusedPage } from './pages';
import { getTimebarTimelinesSelector } from './timebars';

const getState = _.identity;

export const getFocusedPageTimelines = createSelector(
  getState,
  getFocusedPage,
  (state, page = {}) => getTimebarTimelinesSelector(state, { timebarUuid: page.timebarUuid })
);

export default {
  getFocusedPageTimelines,
};
