import _ from 'lodash/fp';
import { createSelector } from 'reselect';

import { getViews } from '../../reducers/views';
import { getPages } from '../../reducers/pages';
import { getPageViews } from '../../selectors/pages';

const filterUnsavedIds = _.pipe(_.filter('isModified'), _.map(_.get('uuid')));

export const getPageUnsavedViewIds = createSelector(
  getPageViews,
  filterUnsavedIds
);

export const getAllUnsavedPageIds = createSelector(
  getPages,
  filterUnsavedIds
);

export const getAllUnsavedViewIds = createSelector(
  getViews,
  filterUnsavedIds
);

export const getPageHasUnsavedViews = createSelector(
  getPageUnsavedViewIds,
  viewsIds => viewsIds.length > 0
);
