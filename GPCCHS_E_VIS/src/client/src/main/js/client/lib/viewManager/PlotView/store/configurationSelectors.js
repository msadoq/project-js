import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getViewConfiguration } from '../../../store/reducers/views';

export const getAxes = createSelector(
  getViewConfiguration,
  _.get('axes')
);

export const getShowYAxes = createSelector(
  getViewConfiguration,
  _.get('showYAxes')
);

export const getGrids = createSelector(
  getViewConfiguration,
  _.get('grids')
);

export const getMarkers = createSelector(
  getViewConfiguration,
  _.get('markers')
);

export const getEntryPoints = createSelector(
  getViewConfiguration,
  _.getOr([], 'entryPoints')
);
