// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add configuration selectors in ViewManager
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Rewrite PlotView EntryPointDetailsContainer selectors .
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add getEntryPoints selector in PlotView configuration selectors
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Add selectors in configurationSelectors + tests
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Move getFocusedPageTimelines in global store/selectors .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from '../../../viewManager';

export const getAxes = createSelector(
  getConfigurationByViewId,
  _.get('axes')
);

export const getShowYAxes = createSelector(
  getConfigurationByViewId,
  _.get('showYAxes')
);

export const getGrids = createSelector(
  getConfigurationByViewId,
  _.get('grids')
);

export const getMarkers = createSelector(
  getConfigurationByViewId,
  _.get('markers')
);

export const getEntryPoints = createSelector(
  getConfigurationByViewId,
  _.getOr([], 'entryPoints')
);
