import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getPage } from '../reducers/pages';
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

export default {
  getFocusedPageTimelines,
};
