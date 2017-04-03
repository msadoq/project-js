import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getViewConfiguration } from '../../../store/reducers/views';
import { getFocusedPage } from '../../../store/selectors/pages';
import { getTimebarTimelinesSelector } from '../../../store/selectors/timebars';

const getState = _.identity;

export const getAxes = createSelector(
  getViewConfiguration,
  _.get('axes')
);

export const getFocusedPageTimelines = createSelector(
  getState,
  getFocusedPage,
  (state, page) => getTimebarTimelinesSelector(state, { timebarUuid: page.timebarUuid })
);
