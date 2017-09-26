// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Remove useless comments . .
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Fix 2 selectors in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Fix memoization issues with getConfigurationByViewId selector
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getView, getViewType } from '../store/reducers/views';

export const getConfigurationByViewId = createSelector(
  state => state,
  (state, { viewId }) => viewId,
  getViewType,
  (state, viewId, viewType) => _.get(`${viewType}Configuration.${viewId}`, state)
);

export const getViewWithConfiguration = createSelector(
  getView,
  getConfigurationByViewId,
  (view, configuration) => _.set('configuration', configuration, view)
);

export const getEntryPointsByViewId = createSelector(
  getConfigurationByViewId,
  _.prop('entryPoints')
);
