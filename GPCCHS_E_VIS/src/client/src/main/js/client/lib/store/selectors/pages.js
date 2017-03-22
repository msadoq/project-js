import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPageViewsIds } from '../reducers/pages';
import { getViews } from '../reducers/views';

const getPageViews = createSelector(
  getPageViewsIds,
  getViews,
  (viewIds, views) => _.map(viewId => ({ ...views[viewId], viewId }), viewIds)
);

// specific to menuManager/pageSave
const getPageModifiedViewsIds = createSelector(
  getPageViews,
  _.pipe(
    _.filter(view => !!view.isModified),
    _.map('uuid')
  )
);

export default {
  getPageViews,
  getPageModifiedViewsIds,
};
