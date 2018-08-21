/* eslint-disable import/prefer-default-export */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from 'viewManager';
import { getTimelinesByViewId } from '../../../store/selectors/timelines';

export const getScrollPosition = createSelector(
  getConfigurationByViewId,
  _.getOr(
    {},
    ['tables', 'history', 'scrollPosition']
  )
);

export const getIsTimelineSelected = createSelector(
  getTimelinesByViewId,
  timelines => timelines.length > 0
);
