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
