// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Remove useless comments . .
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Fix 2 selectors in viewManager
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Remove old configuration reducer .
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : Fix memoization issues with getConfigurationByViewId
//  selector
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Change some protos, plus minor change
// VERSION : 2.0.0 : DM : #5806 : 10/10/2017 : Fix issue with comObject naming for GroundAlarms
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import _map from 'lodash/map';
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

export const getViewEntryPointsDomains = createSelector(
  getView,
  getConfigurationByViewId,
  (view, configuration) =>
    _map(configuration.entryPoints, entryPoint => entryPoint.connectedData.domain)
);
