import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPageViewsIds } from '../reducers/pages';
import { getViews } from '../reducers/views';

const getPageViews = createSelector(
  getPageViewsIds,
  getViews,
  (viewIds, views) => _.map(viewId => ({ ...views[viewId], viewId }), viewIds)
);

export default {
  getPageViews,
};
