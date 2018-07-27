import _ from 'lodash/fp';

import { createSelector } from 'reselect';
import { getViewType, getViewTitle } from 'store/reducers/views';

const getFullTitle = getViewTitle;

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`HistoryViewConfiguration.${viewId}.entryPoints`, state)
);

export const getCountBySearching = createSelector(
  state => state,
  (state, { viewId }) => viewId,
  (state, { searching }) => searching,
  getViewType,
  (state, viewId, searching, viewType) =>
    _.getOr([], [`${viewType}Data`, viewId, 'tables', 'history', 'data'], state).filter(data => data.epName && data.epName.indexOf(searching) !== -1).length
);

export default {
  getFullTitle,
  getCountBySearching,
  getEntryPointsByViewId,
};
