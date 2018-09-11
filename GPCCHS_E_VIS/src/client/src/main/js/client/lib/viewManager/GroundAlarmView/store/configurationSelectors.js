/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import { getConfigurationByViewId } from '../../selectors';

export const getEntryPoints = createSelector(
  getConfigurationByViewId,
  _.getOr([], 'entryPoints')
);
