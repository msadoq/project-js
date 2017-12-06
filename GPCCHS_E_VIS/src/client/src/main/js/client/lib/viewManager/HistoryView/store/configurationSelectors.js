import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getConfigurationByViewId } from 'viewManager';

export const getAllCols = createSelector(
  getConfigurationByViewId,
  _.get('allCols')
);

export const getHiddenCols = createSelector(
  getConfigurationByViewId,
  _.get('hiddenCols')
);

export const getSorting = createSelector(
  getConfigurationByViewId,
  _.get('sorting')
);
