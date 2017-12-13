// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// END-HISTORY
// ====================================================================

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
