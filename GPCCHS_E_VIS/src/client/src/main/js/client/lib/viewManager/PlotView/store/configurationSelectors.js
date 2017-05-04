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
