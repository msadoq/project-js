import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import * as configurationReducers from './reducers';

// Generic selectors
const getAllConfigurations = createSelector(
  _.pick(_.keys(configurationReducers))
);

/* --- Generic reducers ----------------------------------------------------- */
export const getConfigurationByViewId = createSelector(
  (state, { viewId }) => viewId,
  getAllConfigurations,
  (viewId, allConfigurations) => allConfigurations[viewId]
);

export const getEntryPointsByViewId = _.identity;
