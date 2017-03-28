import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import * as configurationReducers from './reducers';

const mergeAllConfigurations = x => _.compose(
  _.mergeAll,
  _.values,
  _.pick(_.keys(configurationReducers))
)(x);

const getAllConfigurations = createSelector(
  _.identity,
  mergeAllConfigurations
);

export const getConfigurationByViewId = createSelector(
  (state, { viewId }) => viewId,
  getAllConfigurations,
  (viewId, allConfigurations) => allConfigurations[viewId]
);

export const getEntryPointsByViewId = createSelector(
  getConfigurationByViewId,
  _.prop('entryPoints')
);
